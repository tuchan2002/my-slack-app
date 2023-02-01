import { Alert, Box } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import ChatHeader from "./chat-header";
import ChatMain from "./chat-main";

const ChatWindow = () => {
  const {
    channelReducer: { selectedChannel },
  } = useSelector((state) => state);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100vh",
      }}
    >
      {selectedChannel ? (
        <ChatHeader />
      ) : (
        <Alert severity="info" sx={{ pt: 2 }}>
          Please select a channel!
        </Alert>
      )}
      <ChatMain />
    </Box>
  );
};

export default ChatWindow;
