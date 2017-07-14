import React, { Component } from 'react';
import { Route, Switch, Link, Redirect } from 'react-router-dom';
import axios from 'axios';

/* -----------------    COMPONENT     ------------------ */

export default class StudentSingle extends Component {
  constructor() {
    super();
    this.state = {
      student: {}
    };
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangeCampus = this.handleChangeCampus.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeName(event) {
    this.setState({ student: { name: event.target.value } });
  }
  handleChangeEmail(event) {
    this.setState({ student: { email: event.target.value } });
  }
  handleChangeCampus(event) {
    this.setState({ student: { campus: event.target.value } });
  }

  handleSubmit(event) {
    const studentId = +this.props.match.params.studentId;
    console.log(studentId);
    event.preventDefault();
    axios
      .put(`/api/students/${studentId}`, {
        id: this.state.student.id,
        name: this.state.student.name,
        email: this.state.student.email
      }) //missing campusid ->
      .then(res => res.data);
    //this.props.history.push('/students');
    //.then(_student => <Redirect to='/students/' />
    // )
  }
  componentDidMount() {
    console.log(this.props.match.params.studentId);
    const studentId = +this.props.match.params.studentId;
    axios.get(`/api/students/${studentId}`).then(res => res.data).then(student => {
      console.log(student);
      this.setState({
        student
      });
    });
  }

  render() {
    const student = this.state.student;

    return (
      <div>
        <form className="student-edit-form" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label for="id">ID</label>
            <input id="id" type="text" disabled value={student.id} />
          </div>
          <div className="form-group">
            <label for="name">Name</label>
            <input
              id="name"
              type="text"
              value={this.state.student.name}
              onChange={this.handleChangeName}
            />
          </div>
          <div className="form-group">
            <label for="email">Email</label>
            <input
              id="email"
              type="text"
              value={this.state.student.email}
              onChange={this.handleChangeEmail}
            />
          </div>
          <div className="form-group">
            <label for="campus">Campus</label>
            <input
              id="campus"
              type="text"
              value={this.state.student.campus && this.state.student.campus.name}
              onChange={this.handleChangeCampus}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Update Student
          </button>
        </form>
      </div>
    );
  }
}

/* -----------------    CONTAINER     ------------------ */
