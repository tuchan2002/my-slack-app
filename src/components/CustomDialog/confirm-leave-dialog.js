import React from 'react';
import AlertDialogContainer from './alert-dialog-container';

function ConfirmLeaveDialog({openDialog, setOpenDialog}) {
    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleLeaveChannel = () => {
        console.log('leave');
    };

    return (
        <AlertDialogContainer
            openDialog={openDialog}
            handleCloseDialog={handleCloseDialog}
            title='Confirmation for Leaving Channel'
            onConfirm={handleLeaveChannel}
            onConfirmText='Leave'
        >
            Are you sure you want to leave this channel?
        </AlertDialogContainer>
    );
}

export default ConfirmLeaveDialog;
