'use strict';
import count from './count';
import {combineReducers} from 'redux';
import loginIn from './login';


const rootReducer = combineReducers({
    loginIn,count
});

export default rootReducer;
