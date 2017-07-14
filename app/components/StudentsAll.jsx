import React, { Component } from 'react';
import { Router, Route, Switch, Link } from 'react-router-dom';
import axios from 'axios';

/* -----------------    COMPONENT     ------------------ */

class StudentsAll extends Component {
  componentDidMount() {
    this.props.getAllStudents();
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete(event) {
    const id = event.target.id;
    event.preventDefault();
    event.stopPropagation();
    this.props.removeStudent(id);
    this.props.getAllStudents();
    this.props.history.push('/students');
  }

  render() {
    return (
      <div>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Campus</th>
              <th />
            </tr>
          </thead>

          <tbody>
            {this.props.allStudents &&
              this.props.allStudents.map(student =>
                <tr key={student.id}>
                  <th>
                    {student.id}
                  </th>
                  <th>
                    <Link to={`/students/${student.id}`}>
                      {student.name}
                    </Link>
                  </th>
                  <th>
                    {student.email}
                  </th>
                  <th>
                    <Link to={`/campuses/${student.campusId}`}>
                      {student.campus.name}
                    </Link>
                  </th>
                  <th>
                    <Link to={`/students/edit/${student.id}`}>
                      <button className="btn btn-sm btn-warning"> Edit</button>
                    </Link>
                  </th>
                  <th>
                    <button
                      className="btn btn-sm btn-danger"
                      id={student.id}
                      onClick={this.handleDelete}>
                      Delete
                    </button>
                  </th>
                </tr>
              )}
          </tbody>
        </table>

        <Link to={'/students/new'}>Add New Student</Link>
      </div>
    );
  }
}

/* -----------------    CONTAINER     ------------------ */
import { connect } from 'react-redux';
import { getAllStudents, removeStudent } from '../reducers/students';

const mapStateToProps = state => {
  return { allStudents: state.studentsReducer.allStudents };
};

const mapDispatchToProps = {
  getAllStudents,
  removeStudent
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentsAll);
