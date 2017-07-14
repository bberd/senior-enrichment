import axios from 'axios';

/* -----------------    ACTIONS     ------------------ */

const GET_CAMPUSES = 'GET_CAMPUSES';
const GET_CAMPUS = 'GET_CAMPUS';
const ADD_CAMPUS = 'ADD_CAMPUS';
export const REMOVE = 'REMOVE_CAMPUS';

// /* ------------   ACTION CREATORS     ------------------ */

export const getCampuses = campuses => ({
  type: GET_CAMPUSES,
  allCampuses: campuses
});

export const selectCampus = campus => ({
  type: GET_CAMPUS,
  chosenCampus: campus
});

const addCampus = campus => ({
  type: ADD_CAMPUS,
  newCampus: campus
});

const remove = id => ({ type: REMOVE, id });

// /* ------------       REDUCER     ------------------ */

const initialState = {
  allCampuses: [],
  chosenCampus: {},
  newCampus: {}
};

export const campusesReducer = (state = initialState, action) => {
  let newState = Object.assign({}, state);
  switch (action.type) {
    case GET_CAMPUSES:
      newState.allCampuses = action.allCampuses;
      break;
    // return Object.assign({}, state, { allCampuses: action.allCampuses });
    case GET_CAMPUS:
      newState.chosenCampus = action.chosenCampus;
      break;
    // return Object.assign({}, state, { chosenCampus: action.chosenCampus });
    case ADD_CAMPUS:
      newState.allCampuses = [...state.allCampuses, action.campus];
      break;
    // return Object.assign({}, state, { newCampus: action.newCampus });
    case REMOVE:
      newState.allCampuses = state.allCampuses.filter(campus => campus.id !== action.id);
      break;
    //return state.allCampuses.filter(campus => campus.id !== action.id);
    default:
      return state;
  }
  return newState;
};

// /* ------------   THUNK CREATORS     ------------------ */

export const getAllCampuses = () => {
  return dispatch => {
    axios
      .get(`/api/campuses`)
      .then(res => res.data)
      .then(campuses => {
        dispatch(getCampuses(campuses));
      })
      .catch(console.error);
  };
};

export const getCampus = campusId => {
  return dispatch => {
    axios
      .get(`/api/campuses/${campusId}`)
      .then(res => res.data)
      .then(chosenCampus => {
        dispatch(selectCampus(chosenCampus));
      })
      .catch(console.error);
  };
};

export const createNewCampus = campus => {
  return function(dispatch) {
    axios
      .post('/api/campuses', campus)
      .then(res => res.data)
      .then(newCampus => {
        dispatch(addCampus(newCampus));
      })
      .then(_ => this.props.history.push('/campuses')) //I know this doesn't make sense, but it seems to make it load the campuses page better
      .catch(console.error.bind(console));
  };
};

export const removeCampus = id => dispatch => {
  dispatch(remove(id));
  axios
    .delete(`/api/campuses/${id}`)
    .then(_ => this.props.history.push('/campuses')) //this too
    .catch(console.error.bind(console));
};
