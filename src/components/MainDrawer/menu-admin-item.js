import { IconButton, Menu, MenuItem } from '@mui/material';
import React, { useCallback, useState } from 'react';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

function MenuAdminItem({handleClickOpenRemoveMemberDialog}) {
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
                <MenuItem>Make admin</MenuItem>
                <MenuItem
                    onClick={handleClickOpenRemoveMemberDialog}
                >
                    Remove Member
                </MenuItem>
            </Menu>
        </div>
    );
}

export default MenuAdminItem;
