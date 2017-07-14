import React, { Component } from 'react';
import { Route, Switch, Link } from 'react-router-dom';

/* -----------------    COMPONENT     ------------------ */
class addNewStudent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      campusId: '1' //make this a select/option
      // campusId: 0
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getAllCampuses();
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
    console.log('changename', event.target.name, 'value', event.target.value, 'state', this.state);
    // this.props.allCampuses.forEach(campus => {
    //   this.setState({
    //     campusId: campus.id
    //   });
    // });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log('submit', event.target);
    this.props.createNewStudent(this.state);
    this.props.history.push('/students');

    this.setState(this.state);
  }

  render() {
    return (
      <div>
        <h2>Create a new Student</h2>
        <form className="student-edit-form" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>
              Name:
              <input
                className="form-control"
                type="text"
                name="name"
                value={this.state.name}
                onChange={this.handleChange}
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              Email:
              <input
                className="form-control"
                type="text"
                name="email"
                value={this.state.email}
                onChange={this.handleChange}
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              Campus:
              <select
                className="form-control"
                name="campusId"
                value={this.state.campus}
                onChange={this.handleChange}>
                {this.props.allCampuses &&
                  this.props.allCampuses.map(campus => {
                    return (
                      <option key={campus.id} value={campus.id}>
                        {campus.name}
                      </option>
                    );
                  })}
              </select>
            </label>
          </div>
          {this.props && console.log(this.props)}

          <input className="btn btn-success" type="submit" />
        </form>
      </div>
    );
  }
}

/* -----------------    CONTAINER     ------------------ */
import { connect } from 'react-redux';
import { createNewStudent } from '../reducers/students';
import { getAllCampuses } from '../reducers/campuses';

const mapStateToProps = state => {
  return {
    allCampuses: state.campusesReducer.allCampuses
  };
};

const mapDispatch = { getAllCampuses, createNewStudent };

export default connect(mapStateToProps, mapDispatch)(addNewStudent);
