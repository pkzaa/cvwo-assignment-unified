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
        <div className="profiles"><img src="https://parnikkapore.neocities.org/media/tang.jpg" />
          <img src="https://parnikkapore.neocities.org/media/iweb.svg" />
          <img src="https://parnikkapore.neocities.org/media/scr.png" />
        </div>
        </div>
        <form action="/auth/developer" method="post">
          <input type="hidden" name="authenticity_token" value={document.querySelector('[name=csrf-token]').content} />
          <input type="submit"  />
        </form>
      </div>
    </>
  )
};
