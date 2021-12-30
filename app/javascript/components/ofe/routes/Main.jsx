// Main screen

import React from "react";
import { useNavigate } from "react-router-dom";

import { Collection, CollectionItem, Col, Modal, Link, Row, Button, Icon } from "react-materialize";
// import { Navbar, NavItem, Icon } from "react-materialize";
import { Navbar, NavSearch, NavButton } from "../deps/Navbar";

import TaskEntry from "../components/TaskEntry";
import AsyncWrapper from "../components/AsyncWrapper";

import { api } from "../deps/lib"

export default function Main_wrapper(props) {
  const navigate = useNavigate();
  return (
    <React.StrictMode>
      <Main navigate={navigate} userID={props.userID} />
    </React.StrictMode>
  );
}

export class Main extends React.Component {
  constructor(props) {
    super(props);
    
    this.handleSearchAllChange = this.handleSearchAllChange.bind(this);
    this.handleError = this.handleError.bind(this);
    
    this.state = {
      searchAll: "",
      error: undefined,
    }
  }

  handleSearchAllChange(value) {
    this.setState({ searchAll: value });
  }
  
  handleError(error) {
    this.setState({ error: error });
  }

  render() {
    return (
      <>
        <Navbar logo="CVTasks">
          <NavSearch onChange={(v) => this.handleSearchAllChange(v)} />
          { this.props.userID // === null
            ? <LogoutButton navigate={this.props.navigate} onError={this.handleError} />
            : <NavButton to="/login">Login</NavButton>
          }
        </Navbar>
        <div className="container">
          <Row>
            <Col s={12}>
              <TaskList searchAll={this.state.searchAll} onError={this.handleError} />
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

function LogoutButton(props) {
  function handleLogoutClicked(event) {
    api(
      `/auth/logout`,
      'POST',
      undefined,
      undefined,
      response => { console.log(["Logging out complete", response]); window.location.reload(); },
      () => console.log("Logging out failed..."),
      message => M.toast({html: `<p>Logging out failed: ${message}</p>`})
    );
  }
  
  return (
    <Modal
      actions={[
        <Button flat modal="close" node="button" waves="green">Cancel</Button>,
        <Button flat modal="close" node="button" waves="red"
          className="red-text text-darken-3" onClick={(e) => handleLogoutClicked(e)}>
          Log out
        </Button>
      ]}
      header={`Confirm logout`}
      trigger={
        <Button node="a">Logout</Button>
      }
    >
      <p>
        Really log out?
      </p>
    </Modal>
  )
}

class TaskList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchDone: false,
      tasks: [],
      error: undefined,
    }
  }

  componentDidMount() {
    api(
      `/api/v1/tasks`,
      'GET',
      undefined,
      () => this.setState({ fetchDone: false }),
      tasks => this.setState({ fetchDone: true, tasks: tasks }),
      () => this.setState({ fetchDone: true, error: "Fetching tasks failed..." }),
      message => this.setState({error: `Fetching tasks failed: ${message}`})
    );
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
      <AsyncWrapper done={this.state.fetchDone} error={this.state.error}>
        <Collection>
          {tasks.map(
            (v, i) => <TaskEntry key={v.id} id={v.id}>{v.name}</TaskEntry>)
          }
        </Collection>
      </AsyncWrapper>
    )
  }
}
