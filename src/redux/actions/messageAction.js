import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebase/config";
import { GET_REALTIME_MESSAGES_BY_CHANNEL } from "../types";

export const getRealtimeMessagesByChannel = (data) => (dispatch) => {
  const q = query(
    collection(db, "messages"),
    where("channelId", "==", data),
    orderBy("createdAt")
  );

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const documents = snapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    dispatch({
      type: GET_REALTIME_MESSAGES_BY_CHANNEL,
      payload: documents,
    });
  });

  return unsubscribe;
};
