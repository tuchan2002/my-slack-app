import { Avatar, Box, Typography } from '@mui/material';
import React from 'react';
import moment from 'moment';
import ReactionBox from './reaction-box';

const formatDate = (seconds) => {
    const messageMoment = moment.utc(seconds * 1000);
    if (moment().diff(messageMoment) < 59 * 60 * 1000) {
        return messageMoment.fromNow();
    }
    return messageMoment.format('lll');
};

function Message({ content, displayName, createdAt, photoURL, imageURL }) {
    return (
        <Box
            sx={{
                display: 'flex',
                gap: 1,
                alignItems: 'flex-start',
                padding: '16px 16px 10px',
                '&:hover': {
                    backgroundColor: '#eee',
                    '& .reaction-box-container': {
                        opacity: 1
                    }
                }
            }}
        >
            <Avatar alt={displayName} src={photoURL} />
            <Box>
                <Box sx={{ display: 'flex', gap: 1 }}>
                    <Typography sx={{ lineHeight: 1, fontWeight: 'bold' }}>
                        {displayName}
                    </Typography>
                    <Typography variant='body2' sx={{ fontSize: '12px' }}>
                        {formatDate(createdAt)}
                    </Typography>
                </Box>
                {content && <Typography style={{marginTop: '2px'}}>{content}</Typography>}
                {imageURL && (
                    <div className='message-image'>
                        <img
                            src={imageURL}
                            alt='imageURL'
                            style={{height: '100%'}}
                        />
                    </div>
                )}
            </Box>
            <div className='reaction-box-container'>
                <ReactionBox />
            </div>
        </Box>
    );
}

export default Message;
