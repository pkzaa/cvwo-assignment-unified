// Main screen

import React from "react";
import { useNavigate } from "react-router-dom";

import { Collection, CollectionItem, Col, Row, Button, Icon } from "react-materialize";
// import { Navbar, NavItem, Icon } from "react-materialize";
import { Navbar, NavSearch, NavButton } from "../deps/Navbar";

import TaskEntry from "../components/TaskEntry";
import LoadingWrapper from "../components/LoadingWrapper";

export default function Main_wrapper(props) {
  const navigate = useNavigate();
  return (<Main navigate={navigate} />);
}

export class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchAll: "",
    }
  }

  handleSearchAllChange(value) {
    this.setState({ searchAll: value });
  }

  render(props) {
    return (
      <>
        <Navbar logo="CVTasks">
          <NavSearch onChange={(v) => this.handleSearchAllChange(v)} />
          <NavButton to="/login">Login</NavButton>
        </Navbar>
        <div className="container">
          <Row>
            <Col s={12}>
              <TaskList searchAll={this.state.searchAll} />
            </Col>
          </Row>
          <Button large floating
            className="red fixed-action-btn"
            icon={<Icon>add</Icon>}
            onClick={() => this.props.navigate("/edit/new")}
          />
        </div>
      </>
    )
  }
}

const BACKEND = "/_tests/tasks.json"; // "https://parnikkapore.neocities.org/_meta/idonotexist";

class TaskList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchDone: false,
      tasks: [],
    }
  }

  componentDidMount() {
    const authedApiOptions = {
      method: 'GET',
      //       body: JSON.stringify({ session: "dummy" }),
      headers: { 'Content-Type': 'application/json' }
    }
    fetch(BACKEND, authedApiOptions)
      .then(response => response.ok ? response.json() : [])
      .then(tasks => { this.setState({ fetchDone: true, tasks: tasks }); })
      .catch(error => this.setState({ fetchDone: true, tasks: [`*WIP* Error fetching task list - ${error.name}: ${error.message}`] }));
  }

  taskMatches(string) {
    const stringIncludesInsensitive = (a, b) => a.toLowerCase().includes(b.toLowerCase());
    return (taskOverview) => (
      !string ||
      stringIncludesInsensitive(taskOverview.name, string) ||
      taskOverview.tags.filter((tag) => stringIncludesInsensitive(tag, string)).length > 0
    )
  }

  render(props) {
    const tasks = this.state.tasks.filter(this.taskMatches(this.props.searchAll));
    return (
      <LoadingWrapper done={this.state.fetchDone}>
        <Collection>
          {tasks.map(
            (v, i) => <TaskEntry key={v.id} id={v.id}>{v.name}</TaskEntry>)
          }
        </Collection>
      </LoadingWrapper>
    )
  }
}
