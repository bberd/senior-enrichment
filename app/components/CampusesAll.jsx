import React, { Component } from 'react';
import { Link } from 'react-router-dom';

/* -----------------    COMPONENT     ------------------ */

export class CampusesAll extends Component {
  componentDidMount() {
    this.props.getAllCampuses();
  }

  render() {
    return (
      <div className="row">
        {this.props.allCampuses &&
          this.props.allCampuses.map(campus =>
            <div className="col-xs-18 col-sm-6 col-md-4">
              <div className="thumbnail">
                <Link key={campus.id} to={`/campuses/${campus.id}`}>
                  <h5 className="panel-heading">
                    {campus.name}
                  </h5>
                  <img src={campus.imageUrl} />
                </Link>
              </div>
            </div>
          )}
        <Link to={`/campuses/new`}>Add New Prison </Link>
      </div>
    );
  }
}

/* -----------------    CONTAINER     ------------------ */
import { connect } from 'react-redux';
import { getAllCampuses } from '../reducers/campuses';

const mapStateToProps = state => {
  return { allCampuses: state.campusesReducer.allCampuses };
};

const mapDispatchToProps = dispatch => {
  return {
    getAllCampuses: () => {
      dispatch(getAllCampuses());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CampusesAll);
