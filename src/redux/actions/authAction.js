import { AUTH } from "../types";

export const handleAuthStateChanged = (data) => async (dispatch) => {
  console.log(data);
  dispatch({
    type: AUTH,
    payload: {
      user: data,
    },
  });
};
