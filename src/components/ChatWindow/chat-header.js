import {
  Box,
  Typography,
  IconButton,
  AvatarGroup,
  Avatar,
  Tooltip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  MenuItem,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import { useSelector } from "react-redux";

const ChatHeader = () => {
  const {
    channelReducer: { selectedChannel, members },
  } = useSelector((state) => state);

  const [openDialog, setOpenDialog] = useState(false);

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <>
      <Box
        sx={{
          p: 2,
          display: "flex",
          justifyContent: "space-between",
          borderBottom: "1px solid #ddd",
        }}
      >
        <Box>
          <Typography variant="h6">{selectedChannel?.name}</Typography>
          <Typography variant="body2">
            {selectedChannel?.description}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <IconButton color="primary" onClick={handleClickOpenDialog}>
            <PersonAddAlt1Icon />
          </IconButton>

          <AvatarGroup max={4}>
            {members?.map((member) => (
              <Tooltip title={member.displayName} key={member.uid}>
                <Avatar
                  alt={member.displayName}
                  src={member.photoURL ? member.photoURL : ""}
                />
              </Tooltip>
            ))}
          </AvatarGroup>
        </Box>
      </Box>
      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth>
        <DialogTitle>Invite members</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            id="role"
            select
            label="Members"
            fullWidth
            variant="standard"
            name="role"
          >
            <MenuItem value={1}>Tran Tu 1</MenuItem>
            <MenuItem value={2}>Tran Tu 2</MenuItem>
            <MenuItem value={3}>Tran Tu 3</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={() => {}}>Invite</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ChatHeader;
