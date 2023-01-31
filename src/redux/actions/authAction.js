import { AUTH } from "../types";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/config";

export const handleAuthStateChanged = (data) => async (dispatch) => {
  dispatch({
    type: AUTH,
    payload: {
      user: data,
    },
  });
};

export const logout = () => async (dispatch) => {
  try {
    signOut(auth);
    window.location.href = "/";
  } catch (err) {
    console.log(err);
  }
};
