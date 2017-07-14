import React, { Component } from 'react';

/* -----------------    COMPONENT     ------------------ */
class addNewStudent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      campusId: '1'
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
    return (
      <div>
        <h2>Create a new Inmate</h2>
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
