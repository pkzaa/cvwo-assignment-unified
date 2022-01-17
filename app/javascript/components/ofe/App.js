import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Button, Checkbox, Collection, CollectionItem } from "react-materialize";
// import { Navbar, NavItem, Icon } from "react-materialize";

import { Navbar, NavSearch, NavButton } from "./deps/Navbar"

import Main from "./routes/Main";
import Login from "./routes/Login";
import Edit from "./routes/Edit";

// We need these for MaterializeCSS
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min';
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import "./App.css";

/*
 * MaterializeCSS references:
 * https://materializecss.com/
 * https://react-materialize.github.io
 */

export default function App(props) {
  return (
    <>
        <Routes>
            <Route path="/" element={<Main loggedIn={props.loggedIn} />} />
            <Route path="/edit/:taskID" element={<Edit />} />
            <Route path="login" element={<Login mode={props.mode} />} />
            <Route path="*" element={<Main />} />
        </Routes>
    </>
  );
}
