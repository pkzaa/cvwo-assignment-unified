import React from "react"
import PropTypes from "prop-types"
import { BrowserRouter } from "react-router-dom";

import App from "./ofe/App"

class Entry extends React.Component {
  render () {
    return (
      <React.Fragment>
        <BrowserRouter>
            <App />
        </BrowserRouter>
      </React.Fragment>
    );
  }
}

export default Entry
