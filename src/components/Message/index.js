import { Avatar, Box, Dialog, DialogTitle, IconButton, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Typography } from '@mui/material';
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useSelector } from 'react-redux';
import ReactionBox from './reaction-box';
import { db } from '../../firebase/config';
import ReactionList from './reaction-list';
import generateReactionLabel from '../../utils/generateReactionLabel';
import generateUsersFromReactions from '../../utils/generateUsersFromReactions';
import DeleteMessageDialog from '../CustomDialog/delete-message-dialog';
import { updateDocument } from '../../firebase/services';

const formatDate = (seconds) => {
    const messageMoment = moment.utc(seconds * 1000);
    if (moment().diff(messageMoment) < 59 * 60 * 1000) {
        return messageMoment.fromNow();
    }
    return messageMoment.format('lll');
};

function Message({uid, messageId, content, displayName, createdAt, photoURL, imageURL, isUnsend }) {
    const [reactions, setReactions] = useState([]);
    const [isOpenDialog, setIsOpenDialog] = useState(false);
    const [isOpenConfirmUnsendDialog, setIsOpenConfirmUnsendDialog] = useState(false);

    const {
        authReducer: { user }
    } = useSelector((state) => state);

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

            setReactions(reactionsData);
        });

        return unsubscribe;
    }, [messageId]);

    const handleOpenReactionsDialog = () => {
        setIsOpenDialog(true);
    };

    const handleCloseReactionsDialog = () => {
        setIsOpenDialog(false);
    };

    const handleUnsendMessage = async () => {
        try {
            await updateDocument('messages', messageId, {
                isUnsend: true
            });

            setIsOpenConfirmUnsendDialog(false);
        } catch (error) {
            console.log(error);
        }
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
                    {content && <Typography style={{marginTop: '2px', fontStyle: isUnsend ? 'italic' : 'normal', color: isUnsend ? '#aaa' : ''}}>{`${!isUnsend ? content : `${user.uid == uid ? 'You' : displayName} unsent a message`}`}</Typography>}
                    {imageURL && !isUnsend && (
                        <div className='message-image'>
                            <img
                                src={imageURL}
                                alt='imageURL'
                                style={{height: '100%'}}
                            />
                        </div>
                    )}
                    {reactions.length > 0 && !isUnsend && <ReactionList reactions={reactions} handleOpenReactionsDialog={handleOpenReactionsDialog} />}
                </Box>
                {!isUnsend && (
                    <div className='reaction-box-container'>
                        <ReactionBox messageId={messageId} reactions={reactions} />
                        {user?.uid == uid && (
                            <IconButton onClick={() => setIsOpenConfirmUnsendDialog(true)}>
                                <DeleteOutlineIcon />
                            </IconButton>
                        )}
                    </div>
                )}
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

            <DeleteMessageDialog
                openDialog={isOpenConfirmUnsendDialog}
                setOpenDialog={setIsOpenConfirmUnsendDialog}
                handleUnsendMessage={handleUnsendMessage}
            />
        </>
    );
}

export default Message;
