import { IconButton, Menu, MenuItem } from '@mui/material';
import React, { useCallback, useState } from 'react';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

function MenuAdminItem({ items }) {
    const [menuAnchor, setMenuAnchor] = useState(null);

    const memberMenuOpen = Boolean(menuAnchor);

    const memberMenuClick = useCallback((event) => {
        setMenuAnchor(event.currentTarget);
    }, []);

    const memberMenuClose = useCallback(() => {
        setMenuAnchor(null);
    }, []);

    return (
        <div>

            <IconButton
                aria-label='menu'
                onClick={memberMenuClick}
            >
                <MoreHorizIcon />
            </IconButton>
            <Menu
                anchorEl={menuAnchor}
                open={memberMenuOpen}
                onClose={memberMenuClose}
            >
                <MenuItem onClick={items.makeAdmin}>Make admin</MenuItem>
                <MenuItem
                    onClick={items.removeMember}
                >
                    Remove Member
                </MenuItem>
            </Menu>
        </div>
    );
}

export default MenuAdminItem;
