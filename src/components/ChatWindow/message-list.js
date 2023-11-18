import { Box } from '@mui/material';
import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import Message from '../Message';

function MessageList() {
    const { messageReducer } = useSelector((state) => state);

    const endOfMessagesRef = useRef(null);
    const scrollToBottom = () => {
        endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messageReducer?.messages]);

    return (
        <Box sx={{ overflowY: 'scroll', marginTop: 'auto' }}>
            {messageReducer?.messages.map((message) => (
                <Message
                    key={message.id}
                    messageId={message.id}
                    content={message.content}
                    displayName={message.displayName}
                    photoURL={message.photoURL}
                    createdAt={message.createdAt?.seconds}
                    imageURL={message?.imageURL}
                />
            ))}
            <div ref={endOfMessagesRef} />
        </Box>
    );
}

export default MessageList;
