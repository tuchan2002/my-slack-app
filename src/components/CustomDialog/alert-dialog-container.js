import React from 'react';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button
} from '@mui/material';

function AlertDialogContainer({children, openDialog, handleCloseDialog, title, onConfirm, onConfirmText, disableConfirmButton}) {
    return (
        <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                {children}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseDialog}>Cancel</Button>
                <Button
                    disabled={disableConfirmButton}
                    onClick={onConfirm}
                >
                    {onConfirmText}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default AlertDialogContainer;
