import { Box } from '@mui/material';
import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import Message from '../Message';
import MessageEvent from '../MessageEvent';

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
            {messageReducer?.messages.map((message) => (message.type == 'event'
                ? (
                    <MessageEvent
                        key={message.id}
                        content={message.content}
                        displayName={message.user?.displayName}
                        uid={message.userId}
                        createdAt={message.createdAt?.seconds}
                    />
                )
                : (
                    <Message
                        key={message.id}
                        uid={message.userId}
                        isUnsend={message.isUnsend}
                        messageId={message.id}
                        content={message.content}
                        displayName={message.user?.displayName}
                        photoURL={message.user?.photoURL}
                        createdAt={message.createdAt?.seconds}
                        imageURL={message?.imageURL}
                    />
                ))
            )}
            <div ref={endOfMessagesRef} />
        </Box>
    );
}

export default MessageList;
