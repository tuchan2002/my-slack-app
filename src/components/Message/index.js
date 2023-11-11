import { Avatar, Box, Typography } from '@mui/material';
import React from 'react';
import moment from 'moment';

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
                padding: '10px 0'
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
                    <div style={{height: '150px', border: '1px solid #ccc', margin: '8px 0'}}>
                        <img
                            src={imageURL}
                            alt='imageURL'
                            style={{height: '100%'}}
                        />
                    </div>
                )}
            </Box>
        </Box>
    );
}

export default Message;
