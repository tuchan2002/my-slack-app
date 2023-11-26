import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { GET_ALL_MEMBERS } from '../types';

// eslint-disable-next-line import/prefer-default-export
export const getAllMembers = (currentMemberInChannel) => async (dispatch) => {
    try {
        const querySnapshot = await getDocs(collection(db, 'users'));
        const members = querySnapshot.docs
            .map((doc) => doc.data())
            .filter((member) => !currentMemberInChannel.includes(member.uid));

        dispatch({
            type: GET_ALL_MEMBERS,
            payload: members
        });
    } catch (error) {
        console.error(error);
    }
};
