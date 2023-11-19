import React, { useState } from 'react';
import {
    Box,
    Avatar,
    MenuItem,
    Select,
    OutlinedInput,
    Chip,
    InputLabel,
    FormControl
} from '@mui/material';
import { useSelector } from 'react-redux';
import AlertDialogContainer from './alert-dialog-container';
import { addDocument, updateDocument } from '../../firebase/services';

function AddPeopleDialog({openDialog, setOpenDialog}) {
    const { authReducer: {user}, channelReducer, memberReducer } = useSelector((state) => state);

    const [membersData, setMembersData] = useState([]);

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    console.log('membersData', membersData);

    const handleAddMembers = async () => {
        const memberIds = [
            // eslint-disable-next-line no-unsafe-optional-chaining
            ...channelReducer?.selectedChannel?.members,
            ...membersData.map((member) => member.uid)
        ];
        await updateDocument('channels', channelReducer?.selectedChannel?.id, {
            members: memberIds
        });

        let contentMessageEvent = '';
        if (membersData.length === 1) {
            contentMessageEvent = `added ${membersData[0].displayName} to the channel`;
        } else if (membersData.length === 2) {
            contentMessageEvent = `added ${membersData[0].displayName} and ${membersData[1].displayName} to the channel`;
        } else if (membersData.length > 2) {
            contentMessageEvent = `added ${membersData[0].displayName} and ${membersData.length - 1} others to the channel`;
        }

        await addDocument('messages', {
            content: contentMessageEvent,
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
            channelId: channelReducer?.selectedChannel?.id,
            type: 'event'
        });

        handleCloseDialog();
        setMembersData([]);
    };

    return (
        <AlertDialogContainer
            openDialog={openDialog}
            handleCloseDialog={handleCloseDialog}
            title='Add people'
            onConfirm={handleAddMembers}
            onConfirmText='Add people'
            disableConfirmButton={!(membersData.length !== 0)}
        >
            <FormControl fullWidth sx={{ my: 1 }}>
                <InputLabel id='invite-members-label'>Select members</InputLabel>
                <Select
                    labelId='invite-members-label'
                    multiple
                    value={membersData}
                    onChange={(e) => setMembersData(e.target.value)}
                    input={<OutlinedInput label='Select members' />}
                    renderValue={(selectedMembers) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selectedMembers.map((selectedMember) => (
                                <Chip
                                    key={selectedMember.uid}
                                    avatar={(
                                        <Avatar
                                            alt={selectedMember.displayName}
                                            src={selectedMember.photoURL}
                                        />
                                    )}
                                    label={selectedMember.displayName}
                                />
                            ))}
                        </Box>
                    )}
                >
                    {memberReducer.members.map((member) => (
                        <MenuItem
                            key={member.uid}
                            value={member}
                            sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}
                        >
                            <Avatar alt={member.displayName} src={member.photoURL} />
                            {member.displayName}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </AlertDialogContainer>
    );
}

export default AddPeopleDialog;
