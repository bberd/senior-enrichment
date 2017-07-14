import React, { Component } from 'react';

/* -----------------    COMPONENT     ------------------ */
class addNewCampus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      imageUrl: ''
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
    this.props.createNewCampus(this.state);
    this.props.history.push('/campuses');

    this.setState(this.state);
  }

  render() {
    return (
      <div>
        <h2>Create a new Campus</h2>
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
              Image URL:
              <input
                className="form-control"
                type="text"
                name="imageUrl"
                value={this.state.imageUrl}
                onChange={this.handleChange}
              />
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
import { createNewCampus } from '../reducers/campuses';

const mapStateToProps = state => {
  return {
    allCampuses: state.campusesReducer.allCampuses
  };
};

const mapDispatch = { createNewCampus };

export default connect(mapStateToProps, mapDispatch)(addNewCampus);
