// Editor screen

import React from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

import { Icon } from "react-materialize";
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
      const BACKEND = "/_tests/getDetails.json"
      const authedApiOptions = {
        method: 'GET',
        //       body: JSON.stringify({ session: "dummy", id: this.props.taskId}),
        headers: { 'Content-Type': 'application/json' }
      }
      fetch(BACKEND, authedApiOptions)
        .then(response => response.ok ? response.json() : [])
        .then(taskDetails => { this.setState({ fetchDone: true, taskDetails: taskDetails }); })
        .catch(error => { console.log("!b"); this.setState({ fetchDone: true, taskDetails: undefined }) });
    }
  }

  handleSubmit(newTask) {
    alert(`Saving edits is not implemented yet. Fakesaving task ${JSON.stringify(newTask)} as ${this.isNewTask() ? "new" : "old"} task`);

    const BACKEND = "/_tests/tasks.json"
    const endpoint = BACKEND + (this.isNewTask() ? "_create" : "_update");
    const _Options = {
      method: 'POST',
      body: JSON.stringify(Object.assign(
        { session: "Dummy" },
        newTask
      )),
      headers: { 'Content-Type': 'application/json' }
    }

    this.setState({ fetchDone: false, taskDetails: newTask });

    fetch(endpoint, _Options)
      .then(response => response.ok ? response.json() : [])
      .then(tasks => { this.setState({ fetchDone: true }); this.props.navigate("/"); })
      .catch(error => { this.setState({ fetchDone: true }); alert(`*WIP* saving task - ${error.name}: ${error.message}`) });
  }

  render(props) {
    return (
      <>
        <Headerbar backButton title={this.isNewTask() ? "Add task" : "Edit task"} />
        <div className="container">
          <LoadingWrapper done={this.state.fetchDone}>
            <TaskEditor onSubmit={(task) => this.handleSubmit(task)} key={this.state.taskDetails} cur={this.state.taskDetails} />
          </LoadingWrapper>
        </div>
      </>
    )
  }
}
