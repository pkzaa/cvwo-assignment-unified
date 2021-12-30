// Login button

import React from "react";
//import { Button } from "react-materialize";
import "./LoginButton.css";

export default class LoginButton extends React.Component {
  constructor(props) {
    super(props);
    
    this.handleClick = this.handleClick.bind(this);
  }
  
  handleClick(event) {
    event.preventDefault();
    console.log(["!c", event.target]);
    document.getElementById(this.props.id).submit();
  }
  
  render(props) {
    return (
      <form id={this.props.id} action={`/auth/${this.props.strategy}`} method="post">
        <input type="hidden" name="authenticity_token" value={document.querySelector('[name=csrf-token]').content} />
        <a className="login-button" onClick={this.handleClick}>
          <img src={this.props.img} />
        </a>  
      </form>
    )
  }
}
