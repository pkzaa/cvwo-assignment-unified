// Main screen

import React from "react";
import { useNavigate } from "react-router-dom";

import { Collection, CollectionItem, Col, Modal, Link, Row, Button, Icon, Dropdown } from "react-materialize";
// import { Navbar, NavItem, Icon } from "react-materialize";
import { Navbar, NavSearch, NavButton } from "../deps/Navbar";
import TaskEntry from "../components/TaskEntry";
import AsyncWrapper from "../components/AsyncWrapper";
import { api, fallback } from "../deps/lib"

import "./Main.css";

export default function Main_wrapper(props) {
  const navigate = useNavigate();
  return (
    <React.StrictMode>
      <Main navigate={navigate} loggedIn={props.loggedIn} />
    </React.StrictMode>
  );
}

const sortNames = {
  created:  "Sort by date added",
  due:      "Sort by deadline",
  name:     "Sort by name",
}

const sortFns = {
  created:  (a,b) => 0,
  due:      (a,b) => new Date(a.due).getTime() - new Date(b.due).getTime(),
  name:     (a,b) => a.name.localeCompare(b.name),
}

export class Main extends React.Component {
  constructor(props) {
    super(props);
    
    this.handleSearchAllChange = this.handleSearchAllChange.bind(this);
    this.handleError = this.handleError.bind(this);
    this.handleSortChange = this.handleSortChange.bind(this);
    
    this.state = {
      searchAll: "",
      error: undefined,
      sortBy: fallback(window.localStorage.getItem("taskSortBy"), "created"),
    }
  }

  handleSearchAllChange(value) {
    this.setState({ searchAll: value });
  }
  
  handleError(error) {
    this.setState({ error: error });
  }
  
  handleSortChange(event) {
    event.preventDefault();
    
    const newSortBy = event.target.getAttribute("value");
    window.localStorage.setItem("taskSortBy", newSortBy);
    this.setState({sortBy: newSortBy});
  }

  render() {
    return (
      <>
        <Navbar logo="CVTasks">
          <NavSearch onChange={this.handleSearchAllChange} />
          { this.props.loggedIn
            ? <LogoutButton navigate={this.props.navigate} onError={this.handleError} />
            : <NavButton to="/login">Login</NavButton>
          }
        </Navbar>
        <div className="container">
          <Row>
          <Col s={12} id="main-root">
          <SortChooser id="sort-chooser" className="right" value={this.state.sortBy} onChange={this.handleSortChange} />
            <div id="task-list">
              <TaskList searchAll={this.state.searchAll} sortBy={this.state.sortBy} onError={this.handleError} />
            </div>
          <Button large floating
            className="red fixed-action-btn"
            icon={<Icon>add</Icon>}
            onClick={() => this.props.navigate("/edit/new")}
          />
          </Col>
          </Row>
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

  render() {
    const tasks = this.state.tasks.filter(this.taskMatches(this.props.searchAll)).sort(sortFns[this.props.sortBy]);
    return (
      <AsyncWrapper done={this.state.fetchDone} error={this.state.error}>
        <Collection>
          {tasks.map(
            (v, i) => <TaskEntry key={v.id} task={v} />)
          }
        </Collection>
      </AsyncWrapper>
    )
  }
}

function SortChooser(props) {
  return (
    <Dropdown
      id="sort-chooser-body"
      trigger={
        <Button flat waves="light" node="button" className={props.className} id={props.id}>
          {sortNames[props.value].replaceAll("Sort", "Sorted")}
          <Icon right>sort</Icon>
        </Button>}
    >
    {Array.from(Object.entries(sortNames),
      ([id, name]) =>
        <a key={id} value={id} onClick={props.onChange} href="#">{name}</a>
    )}
    </Dropdown>
  )
}
