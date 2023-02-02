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
  Select,
  OutlinedInput,
  Chip,
  InputLabel,
  FormControl,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import { useDispatch, useSelector } from "react-redux";
import { getAllMembers } from "../../redux/actions/memberAcion";
import { updateDocument } from "../../firebase/services";
import { async } from "@firebase/util";

const ChatHeader = () => {
  const {
    channelReducer: { selectedChannel, members },
    memberReducer,
  } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllMembers(selectedChannel?.members));
  }, [dispatch]);

  const [openDialog, setOpenDialog] = useState(false);
  const [membersData, setMembersData] = useState([]);

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setMembersData([]);
  };

  const handleInviteMembers = async () => {
    const memberIds = [
      ...selectedChannel?.members,
      ...membersData.map((member) => member.uid),
    ];
    await updateDocument("channels", selectedChannel?.id, {
      members: memberIds,
    });

    handleCloseDialog();
  };

  console.log(membersData);

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

      {/* dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth>
        <DialogTitle>Invite members</DialogTitle>
        <DialogContent>
          <FormControl fullWidth sx={{ my: 1 }}>
            <InputLabel id="invite-members-label">Select members</InputLabel>
            <Select
              labelId="invite-members-label"
              multiple
              value={membersData}
              onChange={(e) => setMembersData(e.target.value)}
              input={<OutlinedInput label="Select members" />}
              renderValue={(selectedMembers) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selectedMembers.map((selectedMember) => (
                    <Chip
                      key={selectedMember.uid}
                      avatar={
                        <Avatar
                          alt={selectedMember.displayName}
                          src={selectedMember.photoURL}
                        />
                      }
                      label={selectedMember.displayName}
                    />
                  ))}
                </Box>
              )}
            >
              {memberReducer.members.map((member) => (
                <MenuItem
                  key={member.uid}
                  value={member}
                  sx={{ display: "flex", gap: 1.5, alignItems: "center" }}
                >
                  <Avatar alt={member.displayName} src={member.photoURL} />
                  {member.displayName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            disabled={membersData.length === 0}
            onClick={handleInviteMembers}
          >
            Invite
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ChatHeader;
