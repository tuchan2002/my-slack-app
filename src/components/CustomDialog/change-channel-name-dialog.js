import React, { useState } from 'react';
import { TextField } from '@mui/material';
import { useSelector } from 'react-redux';
import AlertDialogContainer from './alert-dialog-container';
import { addDocument, updateDocument } from '../../firebase/services';

function ChangeChannelNameDialog({openDialog, setOpenDialog}) {
    const { authReducer: {
        user
    }, channelReducer } = useSelector((state) => state);

    const [newChannelName, setNewChannelName] = useState('');

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleChangeChannelName = async () => {
        try {
            await updateDocument('channels', channelReducer?.selectedChannel?.id, {
                name: newChannelName
            });

            await addDocument('messages', {
                content: `named the channel ${newChannelName}`,
                userId: user?.uid,
                user,
                channelId: channelReducer?.selectedChannel?.id,
                type: 'event'
            });
        } catch (error) {
            console.error(error);
        }

        handleCloseDialog();
        setNewChannelName('');
    };

    return (
        <AlertDialogContainer
            openDialog={openDialog}
            handleCloseDialog={handleCloseDialog}
            title='Change channel name'
            onConfirm={handleChangeChannelName}
            onConfirmText='Change'
            disableConfirmButton={!newChannelName}
        >
            <TextField
                fullWidth
                sx={{mt: 1}}
                label='Channel name'
                variant='outlined'
                value={newChannelName}
                onChange={(e) => setNewChannelName(e.target.value)}
            />
        </AlertDialogContainer>
    );
}

export default ChangeChannelNameDialog;
