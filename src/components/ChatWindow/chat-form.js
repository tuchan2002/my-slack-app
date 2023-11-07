import { Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addDocument } from "../../firebase/services";
import { getRealtimeMessagesByChannel } from "../../redux/actions/messageAction";

const ChatForm = () => {
  const {
    authReducer: {
      user: { uid, displayName, photoURL },
    },
    channelReducer: { selectedChannel },
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
      <Button variant="contained" onClick={handleOnSubmit} color="secondary">
        Send
      </Button>
    </form>
  );
};

export default ChatForm;
