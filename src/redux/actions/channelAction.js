import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../firebase/config";
import { GET_REALTIME_CHANNELS, SELECT_CHANNEL } from "../types";

export const getRealtimeChannels = (data) => (dispatch) => {
  const q = query(
    collection(db, "channels"),
    where("members", "array-contains", data)
  );

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const documents = snapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    dispatch({
      type: GET_REALTIME_CHANNELS,
      payload: documents,
    });
  });

  return unsubscribe;
};

export const selectChannel = (data) => (dispatch) => {
  dispatch({
    type: SELECT_CHANNEL,
    payload: data,
  });
};
