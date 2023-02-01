import {
  GET_REALTIME_CHANNELS,
  GET_REALTIME_MEMBERS,
  SELECT_CHANNEL,
} from "../types";

const initialState = {
  channels: [],
  selectedChannel: null,
  members: [],
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_REALTIME_CHANNELS:
      return {
        ...state,
        channels: action.payload,
      };
    case SELECT_CHANNEL:
      return {
        ...state,
        selectedChannel: state.channels.find(
          (channel) => channel.id === action.payload
        ),
      };
    case GET_REALTIME_MEMBERS:
      return {
        ...state,
        members: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
