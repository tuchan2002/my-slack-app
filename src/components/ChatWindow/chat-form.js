import { Button, IconButton, TextField } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import CloseIcon from '@mui/icons-material/Close';
import moment from 'moment';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { addDocument } from '../../firebase/services';
import { getRealtimeMessagesByChannel } from '../../redux/actions/messageAction';
import { storageDb } from '../../firebase/config';
import EmojiPicker from './emoji-picker';

function ChatForm() {
    const dispatch = useDispatch();

    const fileInputRef = useRef(null);
    const handleIconImageClick = () => {
        fileInputRef.current.click();
    };

    const {
        authReducer: {
            user
        },
        channelReducer: { selectedChannel }
    } = useSelector((state) => state);

    useEffect(() => {
        const unsubscribe = dispatch(
            getRealtimeMessagesByChannel(selectedChannel?.id)
        );

        return unsubscribe;
    }, [selectedChannel?.id]);

    const [messageContent, setMessageContent] = useState('');
    const [image, setImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    const handleImageChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setImage(selectedFile);

            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result);
            };
            reader.readAsDataURL(selectedFile);
        } else {
            setImage(null);
            setPreviewUrl(null);
        }
    };

    const handleDeleteImage = () => {
        setImage(null);
        setPreviewUrl(null);
    };

    const handleEmojiSelect = (emoji) => {
        setMessageContent((prevMessage) => prevMessage + emoji);
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();

        if (image) {
            const imgRef = ref(storageDb, `images/${image.name}-${moment()}`);
            uploadBytes(imgRef, image).then((snapshot) => getDownloadURL(snapshot.ref))
                .then((downloadURL) => {
                    addDocument('messages', {
                        content: messageContent,
                        userId: user?.uid,
                        user,
                        channelId: selectedChannel.id,
                        imageURL: downloadURL,
                        type: 'normal'
                    });
                });
        } else {
            addDocument('messages', {
                content: messageContent,
                userId: user?.uid,
                user,
                channelId: selectedChannel.id,
                type: 'normal'
            });
        }

        setMessageContent('');
        handleDeleteImage();
    };

    return (
        <form onSubmit={handleOnSubmit} className='send-message-form'>
            {image && (
                <div className='preview-image'>
                    <div className='close-button' onClick={handleDeleteImage}>
                        <CloseIcon />
                    </div>
                    <img
                        src={previewUrl}
                        alt='preview'
                        style={{ width: '100%', height: '100%', objectFit: 'cover'}}
                    />
                </div>
            )}
            <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-end'}}>
                <TextField
                    placeholder='Enter your message...'
                    variant='outlined'
                    fullWidth
                    value={messageContent}
                    onChange={(e) => setMessageContent(e.target.value)}
                    multiline
                    maxRows={4}
                />

                <EmojiPicker onSelect={handleEmojiSelect} />

                <IconButton onClick={handleIconImageClick}>
                    <AddPhotoAlternateIcon />
                </IconButton>
                <input
                    type='file'
                    accept='image/*'
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={handleImageChange}
                />
                <Button
                    variant='contained'
                    onClick={handleOnSubmit}
                    color='secondary'
                    disabled={!(image || messageContent)}
                >
                    Send
                </Button>
            </div>
        </form>
    );
}

export default ChatForm;
