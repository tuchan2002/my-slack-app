import { combineReducers } from "redux";
import authReducer from "./authReducer";
import channelReducer from "./channelReducer";
import messageReducer from "./messageReducer";
import memberReducer from "./memberReducer";

export default combineReducers({
  authReducer,
  channelReducer,
  messageReducer,
  memberReducer,
});
