import React, { useEffect, useRef, useState } from 'react';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { IconButton } from '@mui/material';
import MoodIcon from '@mui/icons-material/Mood';

function EmojiPicker({onSelect}) {
    const [showPicker, setShowPicker] = useState(false);
    const pickerRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (pickerRef.current && !pickerRef.current.contains(event.target)) {
                setShowPicker(false);
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const togglePicker = () => {
        setShowPicker(!showPicker);
    };

    return (
        <div style={{position: 'relative'}} ref={pickerRef}>
            <IconButton onClick={togglePicker}>
                <MoodIcon />
            </IconButton>
            {showPicker && (
                <div style={{position: 'absolute', bottom: 50, right: 0}}>
                    <Picker data={data} onEmojiSelect={(emoji) => onSelect(emoji.native)} />
                </div>
            )}
        </div>

    );
}

export default EmojiPicker;
