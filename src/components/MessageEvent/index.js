import React from 'react';
import { useSelector } from 'react-redux';

function MessageEvent({ content, displayName, uid}) {
    const { authReducer: {
        user
    } } = useSelector((state) => state);

    return (
        <div className='message-event'>{`${user.uid == uid ? 'You' : displayName} ${content}`}</div>
    );
}

export default MessageEvent;
