import React, { Component } from 'react';
import { Route, Switch, Link } from 'react-router-dom';

/* -----------------    COMPONENT     ------------------ */

class StudentsAll extends Component {
  componentDidMount() {
    this.props.getAllStudents();
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
              <th>Edit</th>
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
                    {student.name}
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
                    <Link to={`/students/edit/${student.id}`}>Edit</Link>
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
import { getAllStudents } from '../reducers/students';

const mapStateToProps = state => {
  return { allStudents: state.studentsReducer.allStudents };
};

const mapDispatchToProps = dispatch => {
  return {
    getAllStudents: () => {
      dispatch(getAllStudents());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentsAll);
