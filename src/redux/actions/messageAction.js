import {
    collection,
    onSnapshot,
    orderBy,
    query,
    where
} from 'firebase/firestore';
import { db } from '../../firebase/config';
import { GET_REALTIME_MESSAGES_BY_CHANNEL, PUSH_CHANNEL_ON_TOP } from '../types';

// eslint-disable-next-line import/prefer-default-export
export const getRealtimeMessagesByChannel = (data) => (dispatch) => {
    const q = query(
        collection(db, 'messages'),
        where('channelId', '==', data),
        orderBy('createdAt')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
        const documents = snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id
        }));

        dispatch({
            type: GET_REALTIME_MESSAGES_BY_CHANNEL,
            payload: documents
        });
    });

    return unsubscribe;
};

/**
 * Listen to the Messages table on Firebase. Update message states and channel states when the database changed.
 */
export const listenRealtimeMessages = () => (dispatch) => {
    // TODO: query only messages from channels that current user is in
    // TODO: add indicator to notify user that new message has arrived
    const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
        // TODO: update messages

        // Push channel of the latest message on top of channel list.
        if (snapshot.size > 0) {
            const lastMessage = snapshot.docs[0];
            dispatch({
                type: PUSH_CHANNEL_ON_TOP,
                payload: {
                    channelId: lastMessage.data().channelId
                }
            });
        }
    });

    return unsubscribe;
};
