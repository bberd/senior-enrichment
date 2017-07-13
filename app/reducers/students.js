import axios from 'axios';

/* -----------------    ACTIONS     ------------------ */

export const GET_STUDENTS = 'GET_STUDENTS';
export const GET_STUDENT = 'GET_STUDENT';

// /* ------------   ACTION CREATORS     ------------------ */

export const getStudents = students => ({
  type: GET_STUDENTS,
  allStudents: students
});

export const selectStudent = student => ({
  type: GET_STUDENT,
  chosenStudents: student
});

// /* ------------       REDUCER     ------------------ */

const initialState = {
  allStudents: [],
  chosenStudent: {}
};

export const studentsReducer = (state = initialState, action) => {
  const newObject = Object.assign({}, state);
  switch (action.type) {
    case GET_STUDENTS:
      newObject.allStudents = action.allStudents;
      break;
    case GET_STUDENT:
      newObject.chosenStudent = action.chosenStudent;
      break;
    default:
      return state;
  }
  return newObject;
};

// /* ------------   THUNK CREATORS     ------------------ */

export const getAllStudents = () => {
  return dispatch => {
    axios
      .get(`/api/students`)
      .then(res => res.data)
      .then(students => {
        console.log(students);
        dispatch(getStudents(students));
      })
      .catch(console.error);
  };
};

export const getStudent = studentId => {
  return dispatch => {
    axios
      .get(`/api/students/${studentId}`)
      .then(res => res.data)
      .then(chosenStudent => {
        dispatch(selectStudent(chosenStudent));
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
