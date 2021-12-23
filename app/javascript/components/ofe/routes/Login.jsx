// Login screen

import React from "react";
import { Collection, CollectionItem, Col, Row, Icon} from "react-materialize";
// import { Navbar, NavItem } from "react-materialize";
import Headerbar from "../components/Headerbar";

import "./Login.css";

export default function Main(props) {
  return (
    <>
      <Headerbar backButton title="Login" />
      <div className="container">
      <div className="section">
        <p><b>Warning: Logging in is currently not implemented</b></p>
        <p>Pick from one of the providers below:</p>
        <Row>
          <Col s={1} className="profiles"><img src="https://parnikkapore.neocities.org/media/tang.jpg" /></Col>
          <Col s={1} className="profiles"><img src="https://parnikkapore.neocities.org/media/iweb.svg" /></Col>
          <Col s={1} className="profiles"><img src="https://parnikkapore.neocities.org/media/scr.png" /></Col>
        </Row>
        </div>
      </div>
    </>
  )
};
