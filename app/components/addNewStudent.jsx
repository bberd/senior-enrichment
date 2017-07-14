import React, { Component } from 'react';
import { Route, Switch, Link } from 'react-router-dom';

/* -----------------    COMPONENT     ------------------ */
class addNewStudent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      campus: '', //make this a select/option
      campusId: 0
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
    this.props.allCampuses.forEach(campus => {
      this.setState({
        campusId: campus.id
      });
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
              <select
                className="form-control"
                name="campus"
                value={this.state.campus}
                onChange={this.handleChange}>
                {this.props.allCampuses &&
                  this.props.allCampuses.map(campus => {
                    return (
                      <option key={campus.id}>
                        {campus.name}
                      </option>
                    );
                  })}
              </select>
            </label>
            {this.props && console.log(this.props)}

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
import { getAllCampuses } from '../reducers/campuses';

const mapStateToProps = state => {
  return {
    allCampuses: state.campusesReducer.allCampuses
  };
};

const mapDispatch = { getAllCampuses, createNewStudent };

export default connect(mapStateToProps, mapDispatch)(addNewStudent);

// const mapDispatch = (dispatch, ownProps) => {
//   return {
//     debouncedUpdateStory: _.debounce((...args) => {
//       dispatch(updateStory(...args));
//     }, 500),

//     fetchStoryData: () => {
//       const storyId = ownProps.match.params.id;
//       dispatch(fetchStory(storyId));
//     }
//   };
// };
