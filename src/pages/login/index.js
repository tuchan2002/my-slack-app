import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import GoogleIcon from "@mui/icons-material/Google";
import { useSelector } from "react-redux";
import { auth } from "../../firebase/config";
import {
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";
import { addDocument } from "../../firebase/services";

const facebookProvider = new FacebookAuthProvider();
const googleProvider = new GoogleAuthProvider();
const Login = () => {
  const { authReducer } = useSelector((state) => state);

  const handleLoginWithFacebook = async () => {
    const { _tokenResponse, user } = await signInWithPopup(
      auth,
      facebookProvider
    );

    if (_tokenResponse?.isNewUser) {
      await addDocument("users", {
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        uid: user.uid,
        providerId: _tokenResponse.providerId,
      });
    }
  };

  const handleLoginWithGoogle = () => {
    // signInWithPopup(auth, googleProvider);
  };

  return (
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
      }}
    >
      <Avatar sx={{ bgcolor: "primary.main" }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Login
      </Typography>
      <Button
        startIcon={<FacebookRoundedIcon />}
        variant="contained"
        sx={{ minWidth: "300px" }}
        onClick={handleLoginWithFacebook}
      >
        Continue With Facebook
      </Button>
      <Button
        startIcon={<GoogleIcon />}
        variant="outlined"
        sx={{ minWidth: "300px" }}
      >
        Continue With Google
      </Button>
    </Box>
  );
};

export default Login;
