import { Box, Button, TextField } from "@mui/material";
import React from "react";
import Message from "../Message";

const ChatMain = () => {
  return (
    <Box sx={{ p: 2 }}>
      <Box>
        <Message
          text="Hello World ! Hello World ! Hello World !"
          displayName="Tran Tu"
          createdAt="5:00 PM"
          photoURL="https://i.pinimg.com/564x/0c/a0/e8/0ca0e824a87726971c6b140a10b735b1.jpg"
        />
        <Message
          text="Hello World ! Hello World ! Hello World !"
          displayName="Tran Tu"
          createdAt="5:00 PM"
          photoURL="https://i.pinimg.com/564x/0c/a0/e8/0ca0e824a87726971c6b140a10b735b1.jpg"
        />
        <Message
          text="Hello World ! Hello World ! Hello World !"
          displayName="Tran Tu"
          createdAt="5:00 PM"
          photoURL="https://i.pinimg.com/564x/0c/a0/e8/0ca0e824a87726971c6b140a10b735b1.jpg"
        />
      </Box>

      <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
        <TextField
          placeholder="Enter your message..."
          variant="outlined"
          inputProps={{
            style: {
              padding: "8px 14px",
            },
          }}
          fullWidth
        />
        <Button variant="contained">Send</Button>
      </Box>
    </Box>
  );
};

export default ChatMain;
