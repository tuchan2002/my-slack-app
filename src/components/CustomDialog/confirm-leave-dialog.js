import React from 'react';
import { useSelector } from 'react-redux';
import AlertDialogContainer from './alert-dialog-container';
import { addDocument, updateDocument } from '../../firebase/services';

function ConfirmLeaveDialog({openDialog, setOpenDialog}) {
    const {
        authReducer: {
            user
        },
        channelReducer
    } = useSelector((state) => state);

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleLeaveChannel = async () => {
        try {
            const updatedMembers = channelReducer?.members?.filter((member) => member.uid != user.uid);
            const updatedMembersIds = updatedMembers?.map((member) => member.uid);

            await updateDocument('channels', channelReducer?.selectedChannel?.id, {
                members: updatedMembersIds
            });

            await addDocument('messages', {
                content: 'left the channel',
                userId: user?.uid,
                user,
                channelId: channelReducer?.selectedChannel?.id,
                type: 'event'
            });
        } catch (error) {
            console.error(error);
        }
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
