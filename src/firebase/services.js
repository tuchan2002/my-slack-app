import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./config";

export const addDocument = async (collectionName, data) => {
  await addDoc(collection(db, collectionName), {
    ...data,
    createdAt: serverTimestamp(),
  });
};
