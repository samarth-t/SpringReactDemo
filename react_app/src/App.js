import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Title from "./components/Title";
import TitlesList from "./components/TitlesList";

function App() {
  return (
  <div>
    <nav className="navbar navbar-expand navbar-dark bg-dark">
      <a href="/titles" className="navbar-brand">
        Netflix Demo
      </a>

      <div className="navbar-nav mr-auto">
        <li className="nav-item">
          <Link to={"/titles"} className="nav-link">
            Titles
          </Link>
        </li>
      </div>

    </nav>

    <div className="container mt-3">
      <Switch>
        <Route exact path={["/", "/titles"]} component={TitlesList}/>
        <Route path="/titles/:id" component={Title}/>
      </Switch>
    </div>

  </div>
  );
}

export default App;