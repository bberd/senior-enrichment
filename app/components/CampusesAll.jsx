import React, { Component } from "react";
import { Route, Switch, Link } from "react-router-dom";
import Bluebird from "bluebird";
import axios from "axios";

export default class CampusesAll extends Component {
  constructor() {
    super();
    this.state = {
      campuses: []
    };
  }

  componentDidMount() {
    axios.get(`/api/campuses`).then(res => res.data).then(campuses =>
      this.setState({
        campuses
      })
    );
  }

  render() {
    return (
      <div>
        <div>
          {this.state.campuses.map(campus =>
            <Link key={campus.id} to={`/campuses/${campus.id}`}>
              <img src={campus.imageUrl} />
              {campus.name}
            </Link>
          )}
        </div>
      </div>
    );
  }
}
