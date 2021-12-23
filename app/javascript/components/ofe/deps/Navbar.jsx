// Navbar component from Materialize
// Reimplemented manually because the React interface broke

import React from "react";
import { Link } from "react-router-dom";
import { fallback } from "../deps/lib"

export function Navbar(props) {
  return (
    <nav>
      <div className="nav-wrapper">
        <a className="brand-logo left" style={{ padding: "0px 8px" }}>{fallback(props.logo, "Your logo here")}</a>
        <ul id="nav-mobile" className={fallback(props.className, "right")}>
          {React.Children.map(props.children, (child) => <li>{child}</li>)}
        </ul>
      </div>
    </nav>
  )
};

export class NavSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
    }
  }

  handleChange(e) {
    const value = e.target.value;
    this.setState({ value: value });
    this.props.onChange(value);
  }

  render(props) {
    return (
      <form className="hide-on-small-and-down" onSubmit={(event) => event.preventDefault()}>
        <div className="input-field">
          <input id="search" type="search" onChange={(e) => this.handleChange(e)} value={this.state.value} required />
          <label className="label-icon" htmlFor="search"><i className="material-icons">search</i></label>
          <i className="material-icons">close</i>
        </div>
      </form>
    )
  };
}

export function NavButton(props) {
  return (
    <Link className="waves-effect waves-light btn" to={props.to}>{props.children}</Link>
  )
};

export default Navbar;
