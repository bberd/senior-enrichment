import axios from 'axios';

/* -----------------    ACTIONS     ------------------ */

export const GET_CAMPUSES = 'GET_CAMPUSES';
export const GET_CAMPUS = 'GET_CAMPUS';

// /* ------------   ACTION CREATORS     ------------------ */

export const getCampuses = campuses => ({
  type: GET_CAMPUSES,
  allCampuses: campuses
});

export const selectCampus = campus => ({
  type: GET_CAMPUS,
  chosenCampus: campus
});

// /* ------------       REDUCER     ------------------ */

const initialState = {
  allCampuses: [],
  chosenCampus: {}
};

export const campusesReducer = (state = initialState, action) => {
  const newObject = Object.assign({}, state);
  switch (action.type) {
    case GET_CAMPUSES:
      newObject.allCampuses = action.allCampuses;
      break;
    case GET_CAMPUS:
      newObject.chosenCampus = action.chosenCampus;
      break;
    default:
      return state;
  }
  return newObject;
};

// /* ------------   THUNK CREATORS     ------------------ */

export const getAllCampuses = () => {
  return dispatch => {
    axios
      .get(`/api/campuses`)
      .then(res => res.data)
      .then(campuses => {
        console.log(campuses);
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

// export const fetchUsers = () => dispatch => {
//   axios.get('/api/users')
//        .then(res => dispatch(init(res.data)));
// };

// // optimistic
// export const removeUser = id => dispatch => {
//   dispatch(remove(id));
//   axios.delete(`/api/users/${id}`)
//        .catch(err => console.error(`Removing user: ${id} unsuccesful`, err));
// };

// export const addUser = user => dispatch => {
//   axios.post('/api/users', user)
//        .then(res => dispatch(create(res.data)))
//        .catch(err => console.error(`Creating user: ${user} unsuccesful`, err));
// };

// export const updateUser = (id, user) => dispatch => {
//   axios.put(`/api/users/${id}`, user)
//        .then(res => dispatch(update(res.data)))
//        .catch(err => console.error(`Updating user: ${user} unsuccesful`, err));
// };
