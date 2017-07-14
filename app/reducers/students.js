import axios from 'axios';

/* -----------------    ACTIONS     ------------------ */

export const GET_STUDENTS = 'GET_STUDENTS';
export const GET_STUDENT = 'GET_STUDENT';
const ADD_STUDENT = 'ADD_STUDENT';

// /* ------------   ACTION CREATORS     ------------------ */

const getStudents = students => ({
  type: GET_STUDENTS,
  allStudents: students
});

const selectStudent = student => ({
  type: GET_STUDENT,
  chosenStudents: student
});

const addStudent = student => ({
  type: ADD_STUDENT,
  newStudent: student
});

// /* ------------       REDUCER     ------------------ */

const initialState = {
  allStudents: [],
  chosenStudent: {},
  newStudent: {}
};

export const studentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_STUDENTS:
      return Object.assign({}, state, { allStudents: action.allStudents });
    case GET_STUDENT:
      return Object.assign({}, state, { chosenStudent: action.chosenStudent });
    case ADD_STUDENT:
      return Object.assign({}, state, { newStudent: action.newStudent });
    default:
      return state;
  }
};

// case ADD_TACO:
//       return Object.assign({}, state, {student: [...state.student, action.student]})

// export const signup = credentials => dispatch => {
//   return axios.post('/api/auth/me', credentials)
//   .then(resToData)
//   .then(user => {
//     dispatch(createUser(user)); // so new user appears in our master list
//     dispatch(set(user)); // set current user
//     return user;
//   });
// };

// export const signupAndGoToUser = credentials => dispatch => {
//   dispatch(signup(credentials))
//   .then(user => history.push(`/users/${user.id}`))
//   .catch(err => console.error('Problem signing up:', err));
// };

// /* ------------   THUNK CREATORS     ------------------ */

export const getAllStudents = () => {
  return dispatch => {
    axios
      .get(`/api/students`)
      .then(res => res.data)
      .then(students => {
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

export const createNewStudent = student => {
  return function(dispatch) {
    axios
      .post('/api/students', student)
      .then(res => res.data)
      .then(newStudent => {
        dispatch(addStudent(newStudent));
      })
      .catch(console.error.bind(console));
  };
};

// export const postChannel = channel, history {
//   return function thunk(dispatch) {
//     return axios
//       .post("/api/channels", channel)
//       .then(res => res.data)
//       .then(newChannel => {
//         const action = getChannel(newChannel);
//         dispatch(action);
//         socket.emit("new-channel", newChannel);
//         history.push(`/channels/${newChannel.id}`);
//       });
//   };
// }

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
