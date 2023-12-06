import { useCallback } from 'react';
import { useSelector } from 'react-redux';

import AlertDialogContainer from './alert-dialog-container';
import { addDocument, updateDocument } from '../../firebase/services';

export default function RemoveMemberDialog({
    openDialog,
    setOpenDialog,
    member
}) {
    const {
        channelReducer,
        authReducer: { user }
    } = useSelector((state) => state);

    const handleCloseDialog = useCallback(() => setOpenDialog(false), []);

    const handleRemoveMember = useCallback(async () => {
        const updatedMembers = channelReducer?.members?.filter(
            (mem) => mem.uid != member.uid
        );
        const updatedMembersIds = updatedMembers?.map((mem) => mem.uid);

        try {
            await updateDocument('channels', channelReducer?.selectedChannel?.id, {
                members: updatedMembersIds
            });

            await addDocument('messages', {
                content: `removed ${member.displayName} from the channel`,
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
            title='Confirmation for Removing member'
            onConfirm={handleRemoveMember}
            onConfirmText='Remove'
        >
            {`Are you sure you want to remove ${member.displayName} from the channel?`}
        </AlertDialogContainer>
    );
}
