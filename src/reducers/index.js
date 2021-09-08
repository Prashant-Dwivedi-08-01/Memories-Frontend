//? Here we are combining all the reducers into one combined reducer

import { combineReducers } from "redux";

//?Import all the individual reducers
import posts from  "./posts";
import auth from "./auth"

export default combineReducers({
    posts,
    auth,
})