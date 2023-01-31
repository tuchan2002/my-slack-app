import { combineReducers } from "redux";
import authReducer from "./authReducer";
import channelReducer from "./channelReducer";

export default combineReducers({
  authReducer,
  channelReducer,
});
