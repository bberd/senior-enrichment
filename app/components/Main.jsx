import React, { Component } from "react";
import { HashRouter as Router, Route, Switch, Link } from "react-router-dom";
import axios from "axios";
import Students from "./StudentsAll.jsx";
import Campuses from "./CampusesAll.jsx";
import CampusSingle from "./CampusSingle.jsx";
import StudentSingle from "./StudentSingle.jsx";

export default class Main extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <Router>
        <div>
          <ul>
            <li>
              <Link to={`/campuses/`}>Campuses</Link>
            </li>
            <li>
              <Link to={`/students/`}>Students</Link>
            </li>
          </ul>
          <div>
            <Switch>
              <Route exact path={`/campuses`} render={() => <Campuses />} />
              <Route path={`/campuses/:campusId`} component={CampusSingle} />
              <Route exact path={`/students`} render={() => <Students />} />
              <Route path={`/students/:studentId`} render={() => <StudentSingle />} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}
