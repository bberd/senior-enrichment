import React, { Component } from "react";
import { Route, Switch, Link } from "react-router-dom";
import Bluebird from "bluebird";
import axios from "axios";

export default class StudentsAll extends Component {
  constructor() {
    super();
    this.state = {
      students: []
    };
  }

  componentDidMount() {
    axios.get(`/api/students`).then(res => res.data).then(students =>
      this.setState({
        students
      })
    );
  }

  render() {
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
          {this.state.students.map(student =>
            <tr key={student.id}>
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
                {student.campus.name}
              </th>
            </tr>
          )}
        </tbody>
      </table>
    );
  }
}

// <div>
//         <ul>
//           {this.state.students.map(student => {
//             return (
//               <li key={student.id}>
//                 {student.name}
//               </li>
//             );
//           })}
//         </ul>
//       </div>
