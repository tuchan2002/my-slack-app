import { Alert, Box } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import ChatForm from './chat-form';
import ChatHeader from './chat-header';
import MessageList from './message-list';

function ChatWindow() {
    const {
        channelReducer: { selectedChannel }
    } = useSelector((state) => state);

    return (
        <div>
            {selectedChannel ? (
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        height: '100vh'
                    }}
                >
                    <ChatHeader />
                    <MessageList />
                    <ChatForm />
                </Box>
            ) : (
                <Alert severity='info' sx={{ pt: 2 }}>
                    Please select a channel!
                </Alert>
            )}
        </div>
    );
}

export default ChatWindow;
