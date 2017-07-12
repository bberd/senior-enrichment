import React, { Component } from "react";
import { Route, Switch, Link } from "react-router-dom";
import Bluebird from "bluebird";
import axios from "axios";

export default class CampusSingle extends Component {
  constructor() {
    super();
    this.state = {
      selectedCampus: {}
    };
  }

  //change to Promise.all
  componentDidMount() {
    const campusId = this.props.match.params.campusId;
    let tempCampus = {};

    axios
      .get(`api/campuses/${campusId}`)
      .then(res => res.data)
      .then(campus => {
        tempCampus.campus = campus;
      })
      .then(_ => {
        axios
          .get(`api/students/?campusId=${campusId}`)
          .then(res => res.data)
          .then(students => {
            tempCampus.students = students;
          })
          .then(_ => {
            this.setState({ selectedCampus: tempCampus });
          });
      });
  }

  render() {
    const selectedCampus = this.state.selectedCampus;

    return (
      <div>
        <h2>
          {selectedCampus.campus && selectedCampus.campus.name}
        </h2>
        <h3>Student</h3>
        {selectedCampus.students &&
          selectedCampus.students.map(student => {
            return (
              <h4 key={student.id}>
                <Link to={`/students/${student.id}`}>
                  {student.name}
                </Link>
              </h4>

            );
          })}
      </div>
    );
  }
}
