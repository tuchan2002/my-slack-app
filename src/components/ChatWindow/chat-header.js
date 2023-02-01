import {
  Box,
  Typography,
  IconButton,
  AvatarGroup,
  Avatar,
  Tooltip,
} from "@mui/material";
import React from "react";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import { useSelector } from "react-redux";

const ChatHeader = () => {
  const {
    channelReducer: { selectedChannel, members },
  } = useSelector((state) => state);

  return (
    <Box
      sx={{
        p: 2,
        display: "flex",
        justifyContent: "space-between",
        borderBottom: "1px solid #ddd",
      }}
    >
      <Box>
        <Typography variant="h6">{selectedChannel.name}</Typography>
        <Typography variant="body2">{selectedChannel.description}</Typography>
      </Box>

      <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
        <IconButton color="primary">
          <PersonAddAlt1Icon />
        </IconButton>

        <AvatarGroup max={4}>
          {members?.map((member) => (
            <Tooltip title={member.name} key={member.uid}>
              <Avatar
                alt={member.name}
                src={member.photoURL ? member.photoURL : ""}
              />
            </Tooltip>
          ))}
        </AvatarGroup>
      </Box>
    </Box>
  );
};

export default ChatHeader;
