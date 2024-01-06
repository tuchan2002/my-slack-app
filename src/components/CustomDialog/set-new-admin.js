import { useCallback } from 'react';
import { useSelector } from 'react-redux';

import AlertDialogContainer from './alert-dialog-container';
import { addDocument, updateDocument } from '../../firebase/services';

export default function SetNewAdminDialog({
    openDialog,
    setOpenDialog,
    member
}) {
    const {
        channelReducer,
        authReducer: { user }
    } = useSelector((state) => state);

    const handleCloseDialog = useCallback(() => setOpenDialog(false), []);

    const handleSetAdmin = useCallback(async () => {
        try {
            await updateDocument('channels', channelReducer?.selectedChannel?.id, {
                admin: member.uid
            });

            await addDocument('messages', {
                content: `set ${member.displayName} as admin`,
                userId: user?.uid,
                user,
                channelId: channelReducer?.selectedChannel?.id,
                type: 'event'
            });

            setOpenDialog(false);
        } catch (err) {
            console.log(err);
        }
    }, [member]);

    return (
        <AlertDialogContainer
            openDialog={openDialog}
            handleCloseDialog={handleCloseDialog}
            title='Confirmation for changing admin'
            onConfirm={handleSetAdmin}
            onConfirmText='Confirm'
        >
            {`Are you sure you want to set ${member.displayName} as the new admin?`}
        </AlertDialogContainer>
    );
}
