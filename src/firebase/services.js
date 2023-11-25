import {
    collection,
    addDoc,
    serverTimestamp,
    updateDoc,
    doc,
    getDocs,
    query,
    where,
    deleteDoc,
    limit
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

export const deleteDocumentsByTwoCondition = async (collectionName, {condition1Field, condition1Value, condition2Field, condition2Value}) => {
    const docCollection = collection(db, collectionName);

    const q = query(docCollection, where(condition1Field, '==', condition1Value), where(condition2Field, '==', condition2Value));
    const querySnapshot = await getDocs(q);

    querySnapshot.docs.map((docItem) => deleteDoc(doc(db, collectionName, docItem.id)));
};

export const getDocument = async (
    collectionName,
    key,
    value
) => {
    const docRef = collection(db, collectionName);

    const q = query(docRef, where(key, '==', value), limit(1));
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((docItem) => docItem.data());

    if (data.length === 1) {
        return data[0];
    }
    return null;
};
