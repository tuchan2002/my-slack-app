import * as React from 'react';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import GoogleIcon from '@mui/icons-material/Google';
// import { useSelector } from 'react-redux';
import {
    signInWithPopup,
    GoogleAuthProvider,
    FacebookAuthProvider
} from 'firebase/auth';
import { auth } from '../../firebase/config';
import { addDocument } from '../../firebase/services';
import SlackIcon from '../../assets/images/slack.png';

const facebookProvider = new FacebookAuthProvider();
const googleProvider = new GoogleAuthProvider();
function Login() {
    // const { authReducer } = useSelector((state) => state);

    const handleLoginWithFacebook = async () => {
        const { _tokenResponse, user } = await signInWithPopup(
            auth,
            facebookProvider
        );

        if (_tokenResponse?.isNewUser) {
            await addDocument('users', {
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                uid: user.uid,
                providerId: _tokenResponse.providerId
            });
        }
    };

    const handleLoginWithGoogle = async () => {
        const { _tokenResponse, user } = await signInWithPopup(
            auth,
            googleProvider
        );

        if (_tokenResponse?.isNewUser) {
            console.log(_tokenResponse);
            await addDocument('users', {
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                uid: user.uid,
                providerId: _tokenResponse.providerId
            });
        }
    };

    return (
        <Box
            sx={{
                bgcolor: 'primary.main',
                pt: 8,
                height: '100vh'
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 2
                }}
            >
                <img
                    src={SlackIcon}
                    alt='slack-icon'
                    style={{ marginBottom: '16px' }}
                />
                <Button
                    startIcon={<FacebookRoundedIcon />}
                    variant='contained'
                    sx={{ minWidth: '300px' }}
                    onClick={handleLoginWithFacebook}
                    color='secondary'
                >
                    Sign In With Facebook
                </Button>
                <Button
                    startIcon={<GoogleIcon />}
                    variant='contained'
                    sx={{ minWidth: '300px' }}
                    onClick={handleLoginWithGoogle}
                    color='secondary'
                >
                    Sign In With Google
                </Button>
            </Box>
        </Box>
    );
}

export default Login;
