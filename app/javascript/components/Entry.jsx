import React from "react"
import PropTypes from "prop-types"
import { BrowserRouter } from "react-router-dom";

import App from "./ofe/App"

class Entry extends React.Component {
  render () {
    return (
      <React.Fragment>
        <BrowserRouter>
            <App loggedIn={this.props.loggedIn} mode={this.props.mode} />
        </BrowserRouter>
      </React.Fragment>
    );
  }
}

Entry.propTypes = {
  loggedIn: PropTypes.bool
};

export default Entry;
