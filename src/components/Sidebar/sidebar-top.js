import { Avatar, Box, Button, Typography } from "@mui/material";
import React from "react";
import LogoutIcon from "@mui/icons-material/Logout";

const SidebarTop = () => {
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
      <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
        <Avatar alt="avatar" src="/static/images/avatar/1.jpg" />
        <Typography>Tran Anh Tu</Typography>
      </Box>
      <Button endIcon={<LogoutIcon />} variant="outlined">
        Logout
      </Button>
    </Box>
  );
};

export default SidebarTop;
