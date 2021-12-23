import React from "react";
import { Link } from "react-router-dom";

import { Icon } from "react-materialize";
import { Navbar } from "../deps/Navbar";

export default function Headerbar(props) {
  return (
    <Navbar logo={" "} className="left">
      { props.backButton ? <Link to="/"><Icon>arrow_back</Icon></Link> : <></> }
      <span className="brand-logo" style={{padding: "0px 8px"}}>{props.title}</span>
      {props.children}
    </Navbar>
  )
}; 
