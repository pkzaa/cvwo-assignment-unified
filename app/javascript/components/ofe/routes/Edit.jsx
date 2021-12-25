// Editor screen

import React from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

import { Button, Icon, Modal } from "react-materialize";
import Headerbar from "../components/Headerbar";
import TaskEditor from "../components/TaskEditor";
import LoadingWrapper from "../components/LoadingWrapper";

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
    };
  }

  isNewTask() {
    return this.props.taskID === "new";
  }

  componentDidMount() {
    if (this.isNewTask()) {
      this.setState({ fetchDone: true, taskDetails: undefined });
    } else {
      const BACKEND = `/api/v1/show/${this.props.taskID}`
      const authedApiOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      }
      fetch(BACKEND, authedApiOptions)
        .then(response => response.ok ? response.json() : [])
        .then(taskDetails => { this.setState({ fetchDone: true, taskDetails: taskDetails }); })
        .catch(error => { console.log("!b"); this.setState({ fetchDone: true, taskDetails: undefined }) });
    }
  }

  handleSubmit(newTask) {
    // alert(`Saving edits is not implemented yet. Saving task ${JSON.stringify(newTask)} as ${this.isNewTask() ? "new" : "old"} task`);
    const BACKEND = "/api/v1/" + (this.isNewTask() ? "tasks/create" : `update/${this.state.taskDetails.id}`);
    const _Options = {
      method: 'POST',
      body: JSON.stringify(newTask),
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').content
      }
    }

    this.setState({ fetchDone: false, taskDetails: newTask });

    fetch(BACKEND, _Options)
      .then(response => {
        if(response.ok) {
          return response.json();
        } else {
          throw new Error("XHR response not OK");
        }})
      .then(tasks => { this.setState({ fetchDone: true }); this.props.navigate("/"); })
      .catch(error => { this.setState({ fetchDone: true }); console.log(`Saving task failed - ${error.name}: ${error.message}`) });
  }
  
  handleDeleteClicked(e) {
    const _Options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').content
      }
    }
    fetch(`/api/v1/destroy/${this.props.taskID}`, _Options)
      .then(response => {
        if(response.ok) {
          return response.json();
        } else {
          throw new Error("XHR response not OK")
        }})
      .then(tasks => { this.setState({ fetchDone: true }); this.props.navigate("/"); })
      .catch(error => { this.setState({ fetchDone: true }); console.log(`Deleting task failed - ${error.name}: ${error.message}`) });
  }

  render(props) {
    return (
      <>
        <Headerbar backButton title={this.isNewTask() ? "Add task" : "Edit task"} />
        <div className="container">
          <LoadingWrapper done={this.state.fetchDone}>
            <TaskEditor onSubmit={(task) => this.handleSubmit(task)} key={this.state.taskDetails} cur={this.state.taskDetails} />
            { !this.isNewTask()
              ? <>
                  <p> </p> {/* Spacing */}
                  <Modal
                    actions={[
                      <Button flat modal="close" node="button" waves="green">Cancel</Button>,
                      <Button flat modal="close" node="button" waves="red"
                        className="red-text text-darken-3" onClick={(e) => this.handleDeleteClicked(e)}>
                        Delete!
                      </Button>
                    ]}
                    header={`Confirm task deletion`}
                    trigger={
                      <Button className="red darken-3"
                              onClick={(e) => this.handleDeleteClicked(e)}>
                        Delete this task
                      </Button>}
                  >
                    <p>
                      Really delete this task?
                    </p>
                  </Modal>
                </>
              : <></> }
          </LoadingWrapper>
        </div>
      </>
    )
  }
}
