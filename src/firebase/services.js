import {
    collection,
    addDoc,
    serverTimestamp,
    updateDoc,
    doc
} from 'firebase/firestore';
import { db } from './config';

export const addDocument = async (collectionName, data) => {
    await addDoc(collection(db, collectionName), {
        ...data,
        createdAt: serverTimestamp()
    });
};

export const updateDocument = async (collectionName, docId, data) => {
    await updateDoc(doc(db, collectionName, docId), data);
};
