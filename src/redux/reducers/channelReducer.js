import {
    GET_REALTIME_CHANNELS,
    GET_REALTIME_MEMBERS,
    SELECT_CHANNEL,
    PUSH_CHANNEL_ON_TOP
} from '../types';

const initialState = {
    channels: [],
    selectedChannel: null,
    members: []
};

/**
 * Push a channel to the front of the channel state (array), given its id.
 *
 * This function does not modify the original state, it returns a copy of the new state.
 *
 * @param state - Current redux state
 * @param{number} channelId - ID of channel to be pushed on top
 *
 * @returns new redux state after pushing targeted channel on top
 */
function pushChannelOnTop(state, channelId) {
    const newState = {...state};
    const targetChannelId = newState.channels.findIndex(
        (channel) => channel.id === channelId
    );

    // If the channel is already the first channel of the list, it does not need to be pushed on top.
    if (targetChannelId <= 0) {
        return state;
    }

    if (newState.selectedChannel === targetChannelId) {
        newState.selectedChannel = 0;
    }

    const targetChannel = newState.channels[targetChannelId];
    newState.channels.splice(targetChannelId, 1);
    newState.channels.unshift(targetChannel);

    return newState;
}

const channelReducer = (state = initialState, action = {}) => {
    switch (action.type) {
    case GET_REALTIME_CHANNELS:
        // can chinh lai logic cho nay sao cho no dung y nghia cua get all channel
        return {
            ...state,
            channels: action.payload,
            selectedChannel: action.payload.find(
                (channel) => channel.id === state.selectedChannel?.id
            )
        };
    case SELECT_CHANNEL:
        return {
            ...state,
            selectedChannel: state.channels.find(
                (channel) => channel.id === action.payload
            )
        };
    case GET_REALTIME_MEMBERS:
        return {
            ...state,
            members: action.payload
        };
    case PUSH_CHANNEL_ON_TOP:
        return pushChannelOnTop(state, action.payload.channelId);
    default:
        return state;
    }
};

export default channelReducer;
