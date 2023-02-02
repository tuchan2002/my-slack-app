import { GET_ALL_MEMBERS } from "../types";

const initialState = {
  members: [],
};

const memberReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_MEMBERS:
      return {
        ...state,
        members: action.payload,
      };
    default:
      return state;
  }
};

export default memberReducer;
