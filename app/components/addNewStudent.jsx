import React, { Component } from 'react';
import { Route, Switch, Link } from 'react-router-dom';

/* -----------------    COMPONENT     ------------------ */
class addNewStudent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      campus: '' //make this a select/option
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
  }

  handleSubmit(event) {
    event.preventDefault();

    this.props.createNewStudent(this.state);
    this.props.history.push('/students');

    this.setState(this.state);
  }

  render() {
    console.log(this.props);
    return (
      <div>
        <div className="col-sm-2" />
        <div className="col-sm-8">
          <h2>Create a new Student</h2>
          <form onSubmit={this.handleSubmit}>
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
            <label>
              Campus:
              <input
                className="form-control"
                name="campus"
                value={this.state.campus}
                onChange={this.handleChange}
              />
            </label>

            <input className="btn btn-success" type="submit" />
          </form>
        </div>
      </div>
    );
  }
}

/* -----------------    CONTAINER     ------------------ */
import { connect } from 'react-redux';
import { createNewStudent } from '../reducers/students';

const mapStateToProps = state => {
  return { allCampuses: state.campusesReducer.allCampuses };
};

const mapDispatch = {
  createNewStudent
};

export default connect(mapStateToProps, mapDispatch)(addNewStudent);
