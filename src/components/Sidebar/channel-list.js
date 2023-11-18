import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    TextField,
    Typography
} from '@mui/material';
import React, { useState } from 'react';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import { useDispatch, useSelector } from 'react-redux';
import TagIcon from '@mui/icons-material/Tag';
import { addDocument } from '../../firebase/services';
import { selectChannel } from '../../redux/actions/channelAction';

const initialChannelState = {
    name: '',
    description: ''
};
function ChannelList() {
    // const channelsCondition = useMemo(() => {
    //   return {
    //     fieldName: "members",
    //     operator: "array-contains",
    //     compareValue: authReducer.user.uid,
    //   };
    // }, [authReducer.user.uid]);
    const dispatch = useDispatch();

    const {
        authReducer: { user },
        channelReducer
    } = useSelector((state) => state);

    const [openDialog, setOpenDialog] = useState(false);
    const [channelData, setChannelData] = useState(initialChannelState);
    const { name, description } = channelData;

    const handleClickOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setChannelData(initialChannelState);
        setOpenDialog(false);
    };

    const onChangeChannelDataInput = (e) => {
        setChannelData({
            ...channelData,
            [e.target.name]: e.target.value
        });
    };

    const handleCreateChannel = async () => {
        await addDocument('channels', { ...channelData, members: [user.uid] });
        handleCloseDialog();
    };

    return (
        <>
            <Box>
                <Typography sx={{ fontSize: '20px' }}>Channels</Typography>
                <List sx={{ mx: -2 }}>
                    {channelReducer.channels?.map((channel) => (
                        <ListItem
                            disablePadding
                            key={channel.id}
                            onClick={() => dispatch(selectChannel(channel.id))}
                            sx={{
                                bgcolor: `${
                                    channel.id === channelReducer?.selectedChannel?.id
                                        ? '#2657a5'
                                        : ''
                                }`
                            }}
                        >
                            <ListItemButton>
                                <ListItemIcon>
                                    <TagIcon sx={{ color: 'white' }} />
                                </ListItemIcon>
                                <ListItemText primary={channel.name} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                    <ListItem disablePadding>
                        <ListItemButton onClick={handleClickOpenDialog}>
                            <ListItemIcon>
                                <AddBoxOutlinedIcon sx={{ color: 'white' }} />
                            </ListItemIcon>
                            <ListItemText primary='Add channels' />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Box>

            {/* dialog */}
            <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth>
                <DialogTitle>Create a channel</DialogTitle>
                <DialogContent>
                    <TextField
                        margin='dense'
                        id='name'
                        label='Name'
                        fullWidth
                        variant='standard'
                        name='name'
                        value={name}
                        onChange={onChangeChannelDataInput}
                    />
                    <TextField
                        multiline
                        maxRows={4}
                        margin='dense'
                        id='description'
                        label='Description'
                        variant='standard'
                        fullWidth
                        name='description'
                        value={description}
                        onChange={onChangeChannelDataInput}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancel</Button>
                    <Button onClick={handleCreateChannel}>Create</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default ChannelList;
