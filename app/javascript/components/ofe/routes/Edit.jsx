// Editor screen

import React from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

import { Button, Icon, Modal } from "react-materialize";
import Headerbar from "../components/Headerbar";
import TaskEditor from "../components/TaskEditor";
import LoadingWrapper from "../components/LoadingWrapper";
import HideWrapper from "../components/HideWrapper";
import ErrorBox from "../components/ErrorBox";

import {api} from "../deps/lib"

export default function Edit_wrapper(props) {
  return (
    <Edit taskID={useParams().taskID} navigate={useNavigate()} />
  )
}

class Edit extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      fetchDone: false,
      taskDetails: undefined,
      error: undefined,
    };
  }

  isNewTask() {
    return this.props.taskID === "new";
  }

  componentDidMount() {
    if (this.isNewTask()) {
      this.setState({ fetchDone: true, taskDetails: undefined });
    } else {
      api(
        `/api/v1/tasks/${this.props.taskID}`,
        'GET',
        undefined,
        undefined,
        taskDetails => this.setState({ fetchDone: true, taskDetails: taskDetails }),
        () => this.setState({ fetchDone: true, taskDetails: undefined, error: "Loading task failed..." }),
        message => this.setState({ error: `Loading task failed: ${message}` })
      );
    }
  }

  handleSubmit(newTask) {
    api(
      `/api/v1/tasks/${this.isNewTask() ? "" : this.state.taskDetails.id}`,
      this.isNewTask() ? 'POST' : 'PATCH',
      JSON.stringify(newTask),
      () => this.setState({ fetchDone: false, taskDetails: newTask }),
      tasks => { this.setState({ fetchDone: true }); this.props.navigate("/"); },
      () => this.setState({ fetchDone: true, error: "Saving task failed..." }),
      message => this.setState({ error: `Saving task failed: ${message}` })
    );
  }
  
  handleDeleteClicked(e) {
    api(
      `/api/v1/tasks/${this.props.taskID}`,
      'DELETE',
      undefined,
      () => this.setState({ fetchDone: false }),
      tasks => { this.props.navigate("/"); },
      () => this.setState({ fetchDone: true, error: "Deleting task failed..." }),
      message => this.setState({ error: `Deleting task failed: ${message}` })
    );
  }

  render(props) {
    return (
      <>
        <Headerbar backButton title={this.isNewTask() ? "Add task" : "Edit task"} />
        <div className="container">
          <ErrorBox error={this.state.error} />
          <LoadingWrapper done={this.state.fetchDone}>
            <HideWrapper show={!this.state.error}>
              <TaskEditor onSubmit={(task) => this.handleSubmit(task)} key={this.state.taskDetails} cur={this.state.taskDetails} />
              <HideWrapper show={!this.isNewTask()}>
                <p> </p> {/* Spacing */}
                <TaskDeleteModal onClick={(e) => this.handleDeleteClicked(e)}/>
              </HideWrapper>
            </HideWrapper>
          </LoadingWrapper>
        </div>
      </>
    )
  }
}

function TaskDeleteModal(props) {
  return (
    <Modal
    actions={[
      <Button flat modal="close" node="button" waves="green">Cancel</Button>,
      <Button flat modal="close" node="button" waves="red"
        className="red-text text-darken-3" onClick={(e) => props.onClick(e)}>
        Delete!
      </Button>
    ]}
    header={`Confirm task deletion`}
    trigger={
      <Button className="red darken-3">
        Delete this task
      </Button>}
  >
    <p>
      Really delete this task?
    </p>
  </Modal>
  )
}
