import { Avatar, Box, Typography } from "@mui/material";
import React from "react";

const Message = ({ text, displayName, createdAt, photoURL }) => {
  return (
    <Box
      sx={{
        display: "flex",
        gap: 1,
        alignItems: "flex-start",
        padding: "10px 0",
      }}
    >
      <Avatar alt={displayName} src={photoURL} />
      <Box>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Typography sx={{ lineHeight: 1, fontWeight: "bold" }}>
            {displayName}
          </Typography>
          <Typography variant="body2" sx={{ fontSize: "12px" }}>
            {createdAt}
          </Typography>
        </Box>
        <Typography>{text}</Typography>
      </Box>
    </Box>
  );
};

export default Message;
