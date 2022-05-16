import { combineReducers } from "redux";
import authSlice from "./authSlice";

export default combineReducers({
    authState: authSlice,
})
