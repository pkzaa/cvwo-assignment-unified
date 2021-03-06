// Login screen

import React from "react";
import { Collection, CollectionItem, Col, Row, Icon} from "react-materialize";
// import { Navbar, NavItem } from "react-materialize";

import Headerbar from "../components/Headerbar";
import LoginButton from "../components/LoginButton";

import devIcon from "./login_provider_icons/dev.png";
import ghIcon from "./login_provider_icons/github.png";
import hkuIcon from "./login_provider_icons/heroku.png";

import "./Login.css";

export default function Login(props) {
  return (
    <React.StrictMode>
      <Headerbar backButton title="Login" />
      <div className="container">
        <div className="section">
          <p>Pick from one of the providers below:</p>
          <div className="profiles">
            { props.mode=="development" ? <LoginButton id="lbDev" name="Developer" strategy="developer" img={devIcon}   /> : <></> }
            <LoginButton id="lbGh"  name="GitHub"    strategy="github"    img={ghIcon}    />
            <LoginButton id="lbHku" name="Heroku"    strategy="heroku"    img={hkuIcon}    />
          </div>
        </div>
      </div>
    </React.StrictMode>
  )
};
