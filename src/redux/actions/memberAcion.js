import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";
import { GET_ALL_MEMBERS } from "../types";

export const getAllMembers = (currentMemberInChannel) => async (dispatch) => {
  const querySnapshot = await getDocs(collection(db, "users"));
  const members = querySnapshot.docs
    .map((doc) => doc.data())
    .filter((member) => !currentMemberInChannel.includes(member.uid));

  dispatch({
    type: GET_ALL_MEMBERS,
    payload: members,
  });
};
