import React, { Component } from 'react';
import { Route, Switch, Link } from 'react-router-dom';

/* -----------------    COMPONENT     ------------------ */

export class CampusesAll extends Component {
  componentDidMount() {
    this.props.getAllCampuses();
  }

  render() {
    return (
      <div className="row">
        <div className="col-xs-18 col-sm-6 col-md-3">
          <div className="thumbnail">
            {this.props.allCampuses &&
              this.props.allCampuses.map(campus =>
                <Link key={campus.id} to={`/campuses/${campus.id}`}>
                  <div className="panel-heading">
                    {campus.name}
                  </div>
                  <img src={campus.imageUrl} />
                </Link>
              )}
          </div>
        </div>
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
