//make it dumb

import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Students from './StudentsAll.jsx';
import Campuses from './CampusesAll.jsx';
import Home from './Home.jsx';
import CampusSingle from './CampusSingle.jsx';
import StudentSingle from './StudentSingle.jsx';
import StudentSingleEdit from './StudentSingleEdit.jsx';
import addNewStudent from './addNewStudent';
import addNewCampus from './addNewCampus';

/* -----------------    COMPONENT     ------------------ */

export default class Main extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <Router>
        <div className="container">
          <div className="nav-bar text-center">
            <Link to={`/campuses`}>
              <button type="button" className="btn btn-default btn-group-lg nav-btn">
                Prisons
              </button>
            </Link>
            <Link to={`/students`}>
              <button type="button" className="btn btn-default btn-group-lg">
                Inmates
              </button>
            </Link>
          </div>

          <div className="row">
            <Switch>
              <Route path={'/students/new'} component={addNewStudent} />
              <Route path={`/students/edit/:studentId`} component={StudentSingleEdit} />} />
              <Route exact path={`/campuses/new`} component={addNewCampus} />
              <Route path={`/campuses/:campusId`} component={CampusSingle} />
              <Route path={`/campuses`} component={Campuses} />
              <Route exact path={`/students/:studentId`} component={StudentSingle} />}
              <Route path={`/students/`} component={Students} />
              />
              <Route component={Home} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}
