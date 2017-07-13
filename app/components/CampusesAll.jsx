import React, { Component } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import Bluebird from 'bluebird';
import axios from 'axios';

/* -----------------    COMPONENT     ------------------ */

export default class CampusesAll extends Component {
  constructor() {
    super();
    this.state = {
      campuses: [],
    };
  }

  componentDidMount() {
    axios.get(`/api/campuses`).then(res => res.data).then(campuses =>
      this.setState({
        campuses,
      }),
    );
  }

  render() {
    return (
      <div className="row">
        <div className="col-xs-18 col-sm-6 col-md-3">
          <div className="thumbnail">
            {this.state.campuses.map(campus =>
              <Link
                // className="thumbnail"
                key={campus.id}
                to={`/campuses/${campus.id}`}>
                <div className="panel-heading">
                  {campus.name}
                </div>
                <img src={campus.imageUrl} />
              </Link>,
            )}
          </div>
        </div>
      </div>
    );
  }
}

/* -----------------    CONTAINER     ------------------ */
