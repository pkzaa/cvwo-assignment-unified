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
    <React.StrictMode>
      <Edit taskID={useParams().taskID} navigate={useNavigate()} />
    </React.StrictMode>
  )
}

class Edit extends React.Component {

  constructor(props) {
    super(props);
    
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDeleteClicked = this.handleDeleteClicked.bind(this);
    
    this.state = {
      fetchDone: false,
      taskDetails: undefined,
      taskError: undefined,
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
        () => this.setState({ fetchDone: true, taskDetails: undefined, taskError: "Loading task failed..." }),
        message => this.setState({ taskError: `Loading task failed: ${message}` })
      );
    }
  }

  handleSubmit(newTask) {
    api(
      `/api/v1/tasks/${this.isNewTask() ? "" : this.props.taskID}`,
      this.isNewTask() ? 'POST' : 'PATCH',
      JSON.stringify(newTask),
      () => this.setState({ fetchDone: false, taskDetails: newTask }),
      tasks => this.props.navigate("/"),
      () => { this.setState({ fetchDone: true }); console.log("Saving task failed..."); },
      message => M.toast({html: `Saving task failed: ${message}` })
    );
  }
  
  handleDeleteClicked(e) {
    api(
      `/api/v1/tasks/${this.props.taskID}`,
      'DELETE',
      undefined,
      () => this.setState({ fetchDone: false, taskDetails: this.state.taskDetails }),
      tasks => { this.props.navigate("/"); },
      () => { this.setState({ fetchDone: true }); console.log("Deleting task failed..."); },
      message => M.toast({html: `Deleting task failed: ${message}` })
    );
  }

  render(props) {
    return (
      <>
        <Headerbar backButton title={this.isNewTask() ? "Add task" : "Edit task"} />
        <div className="container">
          <LoadingWrapper done={this.state.fetchDone}>
            <ErrorBox error={this.state.taskError} />
            <HideWrapper show={!this.state.taskError}>
              <TaskEditor key={this.state.taskDetails ? this.state.taskDetails.id : null}
                cur={this.state.taskDetails}
                onSubmit={this.handleSubmit} />
              <HideWrapper show={!this.isNewTask()}>
                <p> </p> {/* Spacing */}
                <TaskDeleteModal onClick={this.handleDeleteClicked}/>
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
