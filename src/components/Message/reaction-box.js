import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';
import Popover from '@mui/material/Popover';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import AddReactionOutlinedIcon from '@mui/icons-material/AddReactionOutlined';
import { addDocument, deleteDocumentsByTwoCondition } from '../../firebase/services';

function ReactionBox({messageId, reactions}) {
    const {
        authReducer
    } = useSelector((state) => state);

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const handleReactionSelect = (emoji) => {
        addDocument('reactions', {
            emoji,
            userId: authReducer.user?.uid,
            user: authReducer.user,
            messageId
        });

        handleClose();
    };

    const handleReactionClear = async () => {
        await deleteDocumentsByTwoCondition('reactions', {
            condition1Field: 'messageId',
            condition1Value: messageId,
            condition2Field: 'userId',
            condition2Value: authReducer.user?.uid
        });

        handleClose();
    };

    return (
        <Box>
            <IconButton aria-describedby={id} onClick={handleClick}>
                <AddReactionOutlinedIcon />
            </IconButton>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center'
                }}
                transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left'
                }}
            >
                <Box sx={{px: 2, py: 1, display: 'flex', gap: 2, alignItems: 'center' }}>
                    <span className='emoji-item' onClick={() => handleReactionSelect('👍')}>👍</span>
                    <span className='emoji-item' onClick={() => handleReactionSelect('❤️')}>❤️</span>
                    <span className='emoji-item' onClick={() => handleReactionSelect('😂')}>😂</span>
                    <span className='emoji-item' onClick={() => handleReactionSelect('😯')}>😯</span>
                    <span className='emoji-item' onClick={() => handleReactionSelect('😢')}>😢</span>
                    <span className='emoji-item' onClick={() => handleReactionSelect('😡')}>😡</span>
                    {reactions.some((reaction) => reaction.userId === authReducer.user?.uid) && <CloseIcon sx={{fontSize: 28, cursor: 'pointer'}} onClick={handleReactionClear} />}
                </Box>
            </Popover>
        </Box>
    );
}

export default ReactionBox;
