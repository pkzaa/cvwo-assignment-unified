import React from "react"
import PropTypes from "prop-types"
import { BrowserRouter } from "react-router-dom";

import App from "./ofe/App"

class Entry extends React.Component {
  render () {
    return (
      <React.Fragment>
        <BrowserRouter>
            <App userID={this.props.userID}/>
        </BrowserRouter>
      </React.Fragment>
    );
  }
}

Entry.propTypes = {
  userID: PropTypes.number
};

export default Entry;
