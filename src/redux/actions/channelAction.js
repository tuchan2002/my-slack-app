import { GET_ALL_CHANNELS } from "../types";

export const getAllChannels = (data) => async (dispatch) => {
  dispatch({
    type: GET_ALL_CHANNELS,
    payload: data,
  });
};
