import {
    Box,
    Typography,
    IconButton,
    Avatar,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
    MenuItem,
    Select,
    OutlinedInput,
    Chip,
    InputLabel,
    FormControl,
    Drawer,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Collapse,
    ListItem,
    ListItemAvatar
} from '@mui/material';
import VideocamIcon from '@mui/icons-material/Videocam';
import React, { useEffect, useState } from 'react';
import InfoIcon from '@mui/icons-material/Info';
import EditIcon from '@mui/icons-material/Edit';
import PeopleIcon from '@mui/icons-material/People';
import AddIcon from '@mui/icons-material/Add';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useDispatch, useSelector } from 'react-redux';
import { getAllMembers } from '../../redux/actions/memberAcion';
import { updateDocument } from '../../firebase/services';

function ChatHeader() {
    const { channelReducer, memberReducer } = useSelector((state) => state);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllMembers(channelReducer?.selectedChannel?.members));
        console.log('getAllMembers: re-call');
    }, [dispatch, channelReducer?.selectedChannel]);

    const [openDialog, setOpenDialog] = useState(false);
    const [openDrawer, setOpenDrawer] = useState(false);
    const [openCollapseMembers, setOpenCollapseMembers] = useState(false);
    const [membersData, setMembersData] = useState([]);

    const handleClickOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setMembersData([]);
    };

    const handleClickOpenDrawer = () => {
        setOpenDrawer(true);
    };

    const handleCloseDrawer = () => {
        setOpenDrawer(false);
    };

    const handleInviteMembers = async () => {
        const memberIds = [
            // eslint-disable-next-line no-unsafe-optional-chaining
            ...channelReducer?.selectedChannel?.members,
            ...membersData.map((member) => member.uid)
        ];
        await updateDocument('channels', channelReducer?.selectedChannel?.id, {
            members: memberIds
        });

        handleCloseDialog();
    };

    return (
        <>
            <Box
                sx={{
                    p: 2,
                    display: 'flex',
                    justifyContent: 'space-between',
                    borderBottom: '1px solid #ccc',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    alignItems: 'center'
                }}
            >
                <Box>
                    <Typography sx={{fontWeight: 700, fontSize: '24px'}}>
                        {channelReducer?.selectedChannel?.name}
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    <IconButton color='secondary'>
                        <VideocamIcon />
                    </IconButton>
                    <IconButton color='secondary' onClick={handleClickOpenDrawer}>
                        <InfoIcon />
                    </IconButton>
                </Box>
            </Box>

            {/* dialog */}
            <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth>
                <DialogTitle>Add people</DialogTitle>
                <DialogContent>
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
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancel</Button>
                    <Button
                        disabled={membersData.length === 0}
                        onClick={handleInviteMembers}
                    >
                        Add people
                    </Button>
                </DialogActions>
            </Dialog>

            {/* drawer */}
            <Drawer
                anchor='right'
                open={openDrawer}
                onClose={handleCloseDrawer}
            >
                <Box sx={{ p: 2, minWidth: '440px' }}>
                    <Typography sx={{fontWeight: 700, fontSize: '20px', textAlign: 'center', py: 2 }}>
                        {channelReducer?.selectedChannel?.name}
                    </Typography>

                    <List
                        sx={{ width: '100%', bgcolor: 'background.paper' }}
                        component='nav'
                    >
                        <ListItemButton>
                            <ListItemIcon>
                                <EditIcon />
                            </ListItemIcon>
                            <ListItemText sx={{fontWeight: 500}} primary='Change chat name' />
                        </ListItemButton>
                        <ListItemButton onClick={() => setOpenCollapseMembers(!openCollapseMembers)}>
                            <ListItemIcon>
                                <PeopleIcon />
                            </ListItemIcon>
                            <ListItemText sx={{fontWeight: 500}} primary='Chat members' />
                            {openCollapseMembers ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>

                        <Collapse in={openCollapseMembers} timeout='auto' unmountOnExit>
                            <List component='div' disablePadding>
                                {channelReducer?.members?.map((member) => (
                                    <ListItem disableGutters key={member.uid}>
                                        <ListItemButton>
                                            <ListItemAvatar>
                                                <Avatar alt={member.displayName} src={member.photoURL} />
                                            </ListItemAvatar>
                                            <ListItemText primary={member.displayName} />
                                        </ListItemButton>
                                    </ListItem>
                                ))}
                                <ListItem disableGutters>
                                    <ListItemButton
                                        onClick={handleClickOpenDialog}
                                    >
                                        <ListItemAvatar>
                                            <Avatar>
                                                <AddIcon />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary='Add people' />
                                    </ListItemButton>
                                </ListItem>
                            </List>
                        </Collapse>
                    </List>
                </Box>
            </Drawer>
        </>
    );
}

export default ChatHeader;
