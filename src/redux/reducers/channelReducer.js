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

const channelReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_REALTIME_CHANNELS:
      // can chinh lai logic cho nay sao cho no dung y nghia cua get all channel
      return {
        ...state,
        channels: action.payload,
        selectedChannel: action.payload.find(
          (channel) => channel.id === state.selectedChannel?.id
        ),
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

export default channelReducer;
