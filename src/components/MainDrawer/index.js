import React, { useState } from 'react';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import EditIcon from '@mui/icons-material/Edit';
import PeopleIcon from '@mui/icons-material/People';
import AddIcon from '@mui/icons-material/Add';
import {
    Box,
    Typography,
    Avatar,
    Drawer,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Collapse,
    ListItem,
    ListItemAvatar
} from '@mui/material';
import { useSelector } from 'react-redux';
import AddPeopleDialog from '../CustomDialog/add-people-dialog';
import ConfirmLeaveDialog from '../CustomDialog/confirm-leave-dialog';
import ChangeChannelNameDialog from '../CustomDialog/change-channel-name-dialog';

function MainDrawer({openDrawer, handleCloseDrawer}) {
    const { channelReducer } = useSelector((state) => state);

    const [openCollapseMembers, setOpenCollapseMembers] = useState(false);
    const [openAddPeopleDialog, setOpenAddPeopleDialog] = useState(false);
    const [openConfirmLeaveDialog, setOpenConfirmLeaveDialog] = useState(false);
    const [openChangeChannelNameDialog, setOpenChangeChannelNameDialog] = useState(false);

    const handleToggleOpenCollapseMembers = () => {
        setOpenCollapseMembers(!openCollapseMembers);
    };

    const handleClickOpenAddPeopleDialog = () => {
        setOpenAddPeopleDialog(true);
    };

    const handleClickOpenConfirmLeaveDialog = () => {
        setOpenConfirmLeaveDialog(true);
    };

    const handleClickOpenChangeChannelNameDialog = () => {
        setOpenChangeChannelNameDialog(true);
    };

    return (
        <>
            <ChangeChannelNameDialog
                openDialog={openChangeChannelNameDialog}
                setOpenDialog={setOpenChangeChannelNameDialog}
            />
            <AddPeopleDialog
                openDialog={openAddPeopleDialog}
                setOpenDialog={setOpenAddPeopleDialog}
            />
            <ConfirmLeaveDialog
                openDialog={openConfirmLeaveDialog}
                setOpenDialog={setOpenConfirmLeaveDialog}
            />
            <Drawer
                anchor='right'
                open={openDrawer}
                onClose={handleCloseDrawer}
            >
                <Box sx={{ p: 2, minWidth: '450px' }}>
                    <Typography sx={{fontWeight: 700, fontSize: '20px', textAlign: 'center', py: 2 }}>
                        {channelReducer?.selectedChannel?.name}
                    </Typography>

                    <List
                        sx={{ width: '100%', bgcolor: 'background.paper' }}
                        component='nav'
                    >
                        <ListItemButton onClick={handleClickOpenChangeChannelNameDialog}>
                            <ListItemIcon>
                                <EditIcon />
                            </ListItemIcon>
                            <ListItemText sx={{fontWeight: 500}} primary='Change channel name' />
                        </ListItemButton>
                        <ListItemButton onClick={handleToggleOpenCollapseMembers}>
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
                                    <ListItemButton onClick={handleClickOpenAddPeopleDialog}>
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
                        <ListItemButton onClick={handleClickOpenConfirmLeaveDialog}>
                            <ListItemText sx={{ color: '#d32f2f' }} primary='Leave channel' />
                        </ListItemButton>
                    </List>
                </Box>
            </Drawer>
        </>
    );
}

export default MainDrawer;