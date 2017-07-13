//converted
import { combineReducers } from 'redux';
import { studentsReducer } from './students';
import { campusesReducer } from './campuses';

export default combineReducers({ studentsReducer, campusesReducer });

//what is the purpose of this?
// const initialState = {}

// const rootReducer = function(state = initialState, action) {
//   switch(action.type) {
//     default: return state
//   }
// };

// export default rootReducer
