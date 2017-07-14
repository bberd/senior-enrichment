import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

/* -----------------    COMPONENT     ------------------ */

export class StudentSingle extends Component {
  constructor() {
    super();
    this.state = {
      student: {}
    };
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    const studentId = this.props.match.params.studentId;

    axios.get(`/api/students/${studentId}`).then(res => res.data).then(student =>
      this.setState({
        student
      })
    );
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
    const student = this.state.student;

    return (
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Campus</th>
            <th />
            <th />
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
              {student.campus
                ? <Link to={`/campuses/${student.campus.id}`}>
                    {student.campus.name}
                  </Link>
                : null}
            </th>
            <th>
              <Link to={`/students/edit/${student.id}`}>
                <button className="btn btn-sm btn-warning"> Edit</button>
              </Link>
            </th>
            <th>
              <button className="btn btn-sm btn-danger" id={student.id} onClick={this.handleDelete}>
                Delete
              </button>
            </th>
          </tr>
        </tbody>
      </table>
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

export default connect(mapStateToProps, mapDispatchToProps)(StudentSingle);
