import { Box } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import Message from "../Message";

const MessageList = () => {
  const { messageReducer } = useSelector((state) => state);

  useEffect(() => {
    scrollToBottom();
  }, [messageReducer?.messages]);

  const endOfMessagesRef = useRef(null);
  const scrollToBottom = () => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Box sx={{ px: 2, overflowY: "scroll", marginTop: "auto" }}>
      {messageReducer?.messages.map((message) => (
        <Message
          key={message.id}
          content={message.content}
          displayName={message.displayName}
          photoURL={message.photoURL}
          createdAt={message.createdAt?.seconds}
        />
      ))}
      <div ref={endOfMessagesRef}></div>
    </Box>
  );
};

export default MessageList;
