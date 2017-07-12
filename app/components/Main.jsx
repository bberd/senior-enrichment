import React, { Component } from "react";
import { HashRouter as Router, Route, Switch, Link } from "react-router-dom";
import Students from "./StudentsAll.jsx";
import Campuses from "./CampusesAll.jsx";
import CampusSingle from "./CampusSingle.jsx";
import StudentSingle from "./StudentSingle.jsx";
import StudentSingleEdit from "./StudentSingleEdit.jsx";

export default class Main extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <Router>
        <div className="container">
          <div className="text-center">
            <Link to={`/campuses/`}>
              <button type="button" className="btn btn-default btn-group-lg">
                Campuses
              </button>
            </Link>
            <Link to={`/students/`}>
              <button type="button" className="btn btn-default btn-group-lg">
                Students
              </button>
            </Link>
          </div>

          <div className="row">
            <Switch>
              <Route
                path={`/students/edit/:studentId`}
                component={StudentSingleEdit}
              />} />
              <Route path={`/campuses/:campusId`} component={CampusSingle} />
              <Route path={`/campuses`} render={() => <Campuses />} />
              <Route path={`/students/:studentId`} component={StudentSingle} />}
              <Route path={`/students`} render={() => <Students />} />
              />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

//what is the diff between render and component in Route?
//render can pass props and component can't
