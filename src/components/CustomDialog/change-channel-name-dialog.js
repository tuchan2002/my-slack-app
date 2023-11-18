import React, { useState } from 'react';
import { TextField } from '@mui/material';
import AlertDialogContainer from './alert-dialog-container';

function ChangeChannelNameDialog({openDialog, setOpenDialog}) {
    const [newChannelName, setNewChannelName] = useState('');

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleChangeChannelName = () => {
        console.log('change');
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
