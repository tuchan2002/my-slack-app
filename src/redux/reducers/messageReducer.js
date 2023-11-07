import { GET_REALTIME_MESSAGES_BY_CHANNEL } from '../types';

const initialState = {
    messages: []
};

const messageReducer = (state = initialState, action = {}) => {
    switch (action.type) {
    case GET_REALTIME_MESSAGES_BY_CHANNEL:
        return {
            ...state,
            messages: action.payload
        };
    default:
        return state;
    }
};

export default messageReducer;
