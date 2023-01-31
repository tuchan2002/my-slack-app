import { GET_ALL_CHANNELS } from "../types";

const initialState = {
  channels: [],
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_CHANNELS:
      return action.payload;
    default:
      return state;
  }
};

export default authReducer;
