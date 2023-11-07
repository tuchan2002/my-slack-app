import { signOut } from 'firebase/auth';
import { AUTH } from '../types';
import { auth } from '../../firebase/config';

export const handleAuthStateChanged = (data) => async (dispatch) => {
    dispatch({
        type: AUTH,
        payload: {
            user: data
        }
    });
};

export const logout = () => async () => {
    try {
        signOut(auth);
        window.location.href = '/';
    } catch (err) {
        console.log(err);
    }
};
