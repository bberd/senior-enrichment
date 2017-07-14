import axios from 'axios';

/* -----------------    ACTIONS     ------------------ */

const GET_STUDENTS = 'GET_STUDENTS';
const GET_STUDENT = 'GET_STUDENT';
const ADD_STUDENT = 'ADD_STUDENT';
export const REMOVE = 'REMOVE_STUDENT';

// /* ------------   ACTION CREATORS     ------------------ */

const getStudents = students => ({
  type: GET_STUDENTS,
  allStudents: students
});

const selectStudent = student => ({
  type: GET_STUDENT,
  chosenStudent: student
});

const addStudent = student => ({
  type: ADD_STUDENT,
  newStudent: student
});

const remove = id => ({ type: REMOVE, id });

// /* ------------       REDUCER     ------------------ */

const initialState = {
  allStudents: [],
  chosenStudent: {},
  newStudent: {}
};

export const studentsReducer = (state = initialState, action) => {
  let newState = Object.assign({}, state);
  switch (action.type) {
    case GET_STUDENTS:
      newState.allStudents = action.allStudents;
      break;
    case GET_STUDENT:
      newState.chosenStudent = action.chosenStudent;
      break;
    case ADD_STUDENT:
      newState.allStudents = [...state.allStudents, action.student];
      break;
    case REMOVE:
      newState.allStudents = state.allStudents.filter(student => student.id !== action.id);
      break;
    default:
      return state;
  }
  return newState;
};

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
      .then(_ => this.props.history.push('/students')) //I know this doesn't make sense, but it seems to make it load the students page better
      .catch(console.error.bind(console));
  };
};

export const removeStudent = id => dispatch => {
  dispatch(remove(id));
  axios
    .delete(`/api/students/${id}`)
    .then(_ => this.props.history.push('/students')) //this too
    .catch(console.error.bind(console));
};
