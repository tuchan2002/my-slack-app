import { Avatar, Box, Dialog, DialogTitle, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Typography } from '@mui/material';
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import ReactionBox from './reaction-box';
import { db } from '../../firebase/config';
import ReactionList from './reaction-list';
import { getDocument } from '../../firebase/services';
import generateReactionLabel from '../../utils/generateReactionLabel';
import generateUsersFromReactions from '../../utils/generateUsersFromReactions';

const formatDate = (seconds) => {
    const messageMoment = moment.utc(seconds * 1000);
    if (moment().diff(messageMoment) < 59 * 60 * 1000) {
        return messageMoment.fromNow();
    }
    return messageMoment.format('lll');
};

function Message({messageId, content, displayName, createdAt, photoURL, imageURL }) {
    const [reactions, setReactions] = useState([]);
    const [isOpenDialog, setIsOpenDialog] = useState(false);

    useEffect(() => {
        const q = query(
            collection(db, 'reactions'),
            where('messageId', '==', messageId),
            orderBy('createdAt')
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const reactionsData = snapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id
            }));

            const reactionsDataJoinUsersPromises = reactionsData.map(async (reaction) => {
                const userData = await getDocument('users', 'uid', reaction.userId);

                return {
                    ...reaction,
                    user: userData
                };
            });

            Promise.all(reactionsDataJoinUsersPromises)
                .then((results) => {
                    setReactions(results);
                })
                .catch((error) => {
                    console.error(error);
                });
        });

        return unsubscribe;
    }, [messageId]);

    const handleOpenReactionsDialog = () => {
        setIsOpenDialog(true);
    };

    const handleCloseReactionsDialog = () => {
        setIsOpenDialog(false);
    };

    return (
        <>
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
                    {reactions.length > 0 && <ReactionList reactions={reactions} handleOpenReactionsDialog={handleOpenReactionsDialog} />}
                </Box>
                <div className='reaction-box-container'>
                    <ReactionBox messageId={messageId} reactions={reactions} />
                </div>
            </Box>

            <Dialog onClose={handleCloseReactionsDialog} open={isOpenDialog}>
                <DialogTitle align='center' sx={{ minWidth: '500px', borderBottom: '1px solid #ccc'}}>Message reactions</DialogTitle>
                <List sx={{ pt: 0 }}>
                    {generateUsersFromReactions(reactions).map((userReactions) => (
                        <ListItem disableGutters key={userReactions.user.uid}>
                            <ListItemButton>
                                <ListItemAvatar>
                                    <Avatar
                                        alt={userReactions.user.displayName}
                                        src={userReactions.user.photoURL}
                                    />
                                </ListItemAvatar>
                                <ListItemText primary={userReactions.user.displayName} />
                                <span style={{ fontSize: 20 }}>{generateReactionLabel(userReactions.reactions)}</span>
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Dialog>
        </>
    );
}

export default Message;
