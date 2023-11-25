import {
    collection,
    onSnapshot,
    query,
    where
} from 'firebase/firestore';
import { db } from '../../firebase/config';
import {
    GET_REALTIME_CHANNELS,
    GET_REALTIME_MEMBERS,
    SELECT_CHANNEL
} from '../types';

export const getRealtimeChannels = (data) => (dispatch) => {
    const q = query(
        collection(db, 'channels'),
        where('members', 'array-contains', data)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
        const documents = snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id
        }));

        dispatch({
            type: GET_REALTIME_CHANNELS,
            payload: documents
        });
    });

    return unsubscribe;
};

export const getRealtimeMemberInChannel = (data) => (dispatch) => {
    const q = query(collection(db, 'users'), where('uid', 'in', data));

    const unsubscribe = onSnapshot(q, (snapshot) => {
        const members = snapshot.docs.map((doc) => ({
            ...doc.data()
        }));

        dispatch({
            type: GET_REALTIME_MEMBERS,
            payload: members
        });
    });

    return unsubscribe;
};

export const selectChannel = (data) => (dispatch) => {
    dispatch({
        type: SELECT_CHANNEL,
        payload: data
    });
};
