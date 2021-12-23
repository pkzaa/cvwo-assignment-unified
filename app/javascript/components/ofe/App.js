import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Button, Checkbox, Collection, CollectionItem } from "react-materialize";
// import { Navbar, NavItem, Icon } from "react-materialize";

import { Navbar, NavSearch, NavButton } from "./deps/Navbar"

import Main from "./routes/Main";
import Login from "./routes/Login";
import Logout from "./routes/Logout";
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

export default function App() {
  return (
    <>
        <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/edit/:taskID" element={<Edit />} />
            <Route path="about" element={<About />} />
            <Route path="login" element={<Login />} />
            <Route path="logout" element={<Logout />} />
            <Route path="*" element={<Main />} />
        </Routes>
    </>
  );
}

function Home() {
  return (
    <>
      <main>
        <h2>Welcome to the homepage!</h2>
        <p>You can do this, I believe in you.</p>
      </main>
      <nav>
        <Link to="/about">About</Link>
      </nav>
    </>
  );
}

const About = (props) => (
    <>
    <Collection>
        <CollectionItem><Checkbox filledIn label="yes" value="yeah" /></CollectionItem>
        <CollectionItem><Checkbox filledIn label="no"  value="nah"  /></CollectionItem>
    </Collection>
    <Navbar logo="CVTasks">
            <Link to="/">Home</Link>
            <NavSearch />
            <NavButton>Login</NavButton>
        </Navbar>
    </>
);
