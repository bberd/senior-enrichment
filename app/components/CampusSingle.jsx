import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

/* -----------------    COMPONENT     ------------------ */

export class CampusSingle extends Component {
  constructor() {
    super();
    this.state = {
      selectedCampus: {}
    };
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete(event) {
    const id = event.target.id;
    event.preventDefault();
    event.stopPropagation();
    this.props.removeCampus(id);
    this.props.getAllCampuses();
    this.props.history.push('/campuses');
  }

  componentDidMount() {
    const campusId = this.props.match.params.campusId;
    let tempCampus = {};

    axios
      .get(`api/campuses/${campusId}`)
      .then(res => res.data)
      .then(campus => {
        tempCampus.campus = campus;
      })
      .then(_ => {
        axios
          .get(`api/students/?campusId=${campusId}`)
          .then(res => res.data)
          .then(students => {
            tempCampus.students = students;
          })
          .then(_ => {
            this.setState({ selectedCampus: tempCampus });
          });
      });
  }

  render() {
    const selectedCampus = this.state.selectedCampus;

    return (
      <div>
        <h2>
          {selectedCampus.campus && selectedCampus.campus.name}
          <span> </span>
          <button
            className="btn btn-sm btn-danger"
            id={selectedCampus.campus && selectedCampus.campus.id}
            onClick={this.handleDelete}>
            Delete
          </button>
        </h2>
        <h3>Student</h3>
        {selectedCampus.students &&
          selectedCampus.students.map(student => {
            return (
              <h4 key={student.id}>
                <Link to={`/students/${student.id}`}>
                  {student.name}
                </Link>
              </h4>
            );
          })}
      </div>
    );
  }
}

/* -----------------    CONTAINER     ------------------ */
import { connect } from 'react-redux';
import { getAllCampuses, removeCampus } from '../reducers/campuses';

const mapStateToProps = state => {
  return { allCampuses: state.campusesReducer.allCampuses };
};

const mapDispatchToProps = {
  getAllCampuses,
  removeCampus
};

export default connect(mapStateToProps, mapDispatchToProps)(CampusSingle);
