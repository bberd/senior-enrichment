import React, { Component } from "react";
import { Route, Switch, Link } from "react-router-dom";
import Bluebird from "bluebird";
import axios from "axios";

export default class StudentSingle extends Component {
  constructor() {
    super();
    this.state = {
      student: {}
    };
  }

  //change to Promise.all
  componentDidMount() {
    const studentId = this.props.match.params.studentId;

    axios
      .get(`/api/students/${studentId}`)
      .then(res => res.data)
      .then(student =>
        this.setState({
          student
        })
      );
  }

  render() {
    const student = this.state.student;

    return (
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Campus</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <th>
              {student.id}
            </th>
            <th>
              {student.name}
            </th>
            <th>
              {student.email}
            </th>
            <th>
              {student.campus ?
                <Link to={`/campuses/${student.campus.id}`}>
                  {student.campus.name}
                </Link>
                : null
              }
            </th>
          </tr>
        </tbody>
      </table>
    );
  }
}
