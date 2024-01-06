// import { useSelector } from 'react-redux';
import AlertDialogContainer from './alert-dialog-container';
// import { addDocument, updateDocument } from '../../firebase/services';

export default function DeleteMessageDialog({
    openDialog,
    setOpenDialog,
    handleUnsendMessage
}) {
    // const {
    //     channelReducer,
    //     authReducer: { user }
    // } = useSelector((state) => state);

    const handleCloseDialog = () => setOpenDialog(false);

    return (
        <AlertDialogContainer
            openDialog={openDialog}
            handleCloseDialog={handleCloseDialog}
            title='Confirmation for Removing message'
            onConfirm={handleUnsendMessage}
            onConfirmText='Unsend'
        >
            Unsend for everyone ?
        </AlertDialogContainer>
    );
}
