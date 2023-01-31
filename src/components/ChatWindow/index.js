import { Box } from "@mui/material";
import React from "react";
import ChatHeader from "./chat-header";
import ChatMain from "./chat-main";

const ChatWindow = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100vh",
      }}
    >
      <ChatHeader />
      <ChatMain />
    </Box>
  );
};

export default ChatWindow;
