import { Box } from '@mui/material';
import React from 'react';
import ChannelList from './channel-list';
import SidebarTop from './sidebar-top';

function Sidebar() {
    return (
        <Box
            sx={{
                p: 2,
                borderRight: '1px solid #ddd',
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                gap: 3,
                bgcolor: 'primary.main',
                color: 'white'
            }}
        >
            <SidebarTop />
            <ChannelList />
        </Box>
    );
}

export default Sidebar;
