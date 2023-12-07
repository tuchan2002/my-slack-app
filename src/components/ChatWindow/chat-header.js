import {
    Box,
    Typography,
    IconButton
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import InfoIcon from '@mui/icons-material/Info';
import { useDispatch, useSelector } from 'react-redux';
import { getAllMembers } from '../../redux/actions/memberAcion';
import MainDrawer from '../MainDrawer';

function ChatHeader() {
    const { channelReducer } = useSelector((state) => state);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllMembers(channelReducer?.selectedChannel?.members));
    }, [dispatch, channelReducer?.selectedChannel]);

    const [openDrawer, setOpenDrawer] = useState(false);

    const handleClickOpenDrawer = () => {
        setOpenDrawer(true);
    };

    const handleCloseDrawer = () => {
        setOpenDrawer(false);
    };

    return (
        <>
            <MainDrawer
                openDrawer={openDrawer}
                handleCloseDrawer={handleCloseDrawer}
            />
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
                    <IconButton color='secondary' onClick={handleClickOpenDrawer}>
                        <InfoIcon />
                    </IconButton>
                </Box>
            </Box>
        </>
    );
}

export default ChatHeader;
