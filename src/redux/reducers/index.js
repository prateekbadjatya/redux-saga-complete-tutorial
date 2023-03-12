import { combineReducers } from "redux";
import users from "./userReducers";

const rootReducer = combineReducers({
    users: users
})
export default rootReducer;

