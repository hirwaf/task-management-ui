import {combineReducers} from 'redux';
import {userReducer} from "./user";
import {taskReducer} from "./task";

const reducers = combineReducers({
    user: userReducer,
    task: taskReducer,
});
export default reducers;