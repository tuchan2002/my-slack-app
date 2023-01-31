import { Avatar, Box, Button, Typography } from "@mui/material";
import React, { useEffect } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/actions/authAction";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/config";

const SidebarTop = () => {
  const { authReducer } = useSelector((state) => state);
  const dispatch = useDispatch();

  const { displayName, photoURL } = authReducer.user;

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
        <Avatar alt="" src={photoURL ? photoURL : ""} />
        <Typography>{displayName}</Typography>
      </Box>
      <Button
        endIcon={<LogoutIcon />}
        variant="outlined"
        onClick={handleLogout}
      >
        Logout
      </Button>
    </Box>
  );
};

export default SidebarTop;
