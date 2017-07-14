import { combineReducers } from 'redux';
import { studentsReducer } from './students';
import { campusesReducer } from './campuses';

export default combineReducers({ studentsReducer, campusesReducer });
