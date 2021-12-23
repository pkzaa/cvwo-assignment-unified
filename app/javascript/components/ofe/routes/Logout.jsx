// Logout screen

import React from "react";
import { Link, useNavigate } from "react-router-dom";

import { Collection, CollectionItem, Col, Row, Icon, Card, Button } from "react-materialize";
import Headerbar from "../components/Headerbar";

import "./Login.css";

function doLogout(navigate) {
    navigate("/");
}

export default function Main(props) {
  const navigate = useNavigate();
  return (
    <>
      <Headerbar backButton title="Logout" />
      <div className="container">
      <Card className="white black-text"
        actions={[
            <a onClick={() => doLogout(navigate)}>Yes</a>,
            <Link to="/">Cancel</Link>
        ]}>
        Do you wish to log out?
    </Card>
      </div>
    </>
  )
}; 
