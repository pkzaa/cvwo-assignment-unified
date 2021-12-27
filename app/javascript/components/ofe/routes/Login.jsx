// Login screen

import React from "react";
import { Collection, CollectionItem, Col, Row, Icon} from "react-materialize";
// import { Navbar, NavItem } from "react-materialize";

import Headerbar from "../components/Headerbar";
import LoginButton from "../components/LoginButton";

import "./Login.css";

export default function Main(props) {
  return (
    <>
      <Headerbar backButton title="Login" />
      <div className="container">
      <div className="section">
        <p><b>Warning: Logging in is currently not implemented</b></p>
        <p>Pick from one of the providers below:</p>
        <div className="profiles">
          <LoginButton id="lbDev" strategy="developer" img="https://parnikkapore.neocities.org/media/tang.jpg" />
          <LoginButton id="lbGh"  strategy="github"    img="https://parnikkapore.neocities.org/media/scr.png" />
          <LoginButton id="lbGh"  strategy="github"    img="https://parnikkapore.neocities.org/media/iweb.svg" />
        </div>
        </div>
      </div>
    </>
  )
};
