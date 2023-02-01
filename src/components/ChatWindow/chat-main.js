import { Box, Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addDocument } from "../../firebase/services";
import { getRealtimeMessagesByChannel } from "../../redux/actions/messageAction";
import Message from "../Message";

const ChatMain = () => {
  const {
    authReducer: {
      user: { uid, displayName, photoURL },
    },
    channelReducer: { selectedChannel },
    messageReducer,
  } = useSelector((state) => state);

  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = dispatch(
      getRealtimeMessagesByChannel(selectedChannel?.id)
    );

    return unsubscribe;
  }, [selectedChannel?.id]);

  const [messageContent, setMessageContent] = useState("");

  const handleOnSubmit = (e) => {
    e.preventDefault();
    addDocument("messages", {
      content: messageContent,
      uid,
      displayName,
      photoURL,
      channelId: selectedChannel.id,
    });
    setMessageContent("");
  };

  return (
    <Box sx={{ p: 2 }}>
      <Box>
        {messageReducer?.messages.map((message) => (
          <Message
            key={message.id}
            content={message.content}
            displayName={message.displayName}
            photoURL={message.photoURL}
            createdAt={message.createdAt?.seconds}
          />
        ))}
      </Box>

      <form onSubmit={handleOnSubmit} className="send-message-form">
        <TextField
          placeholder="Enter your message..."
          variant="outlined"
          inputProps={{
            style: {
              padding: "8px 14px",
            },
          }}
          fullWidth
          value={messageContent}
          onChange={(e) => setMessageContent(e.target.value)}
        />
        <Button variant="contained" onClick={handleOnSubmit}>
          Send
        </Button>
      </form>
    </Box>
  );
};

export default ChatMain;
