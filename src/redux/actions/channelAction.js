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

        // chua update selectedChannel ak? update di, dinh update moi tk channels ak
        console.log(GET_REALTIME_CHANNELS);
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

        console.log(GET_REALTIME_MEMBERS);
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
