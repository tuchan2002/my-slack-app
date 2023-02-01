import {
  Box,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import { useSelector } from "react-redux";
import TagIcon from "@mui/icons-material/Tag";
import { useMemo } from "react";

const ChannelList = () => {
  const { channelReducer } = useSelector((state) => state);

  // const channelsCondition = useMemo(() => {
  //   return {
  //     fieldName: "members",
  //     operator: "array-contains",
  //     compareValue: authReducer.user.uid,
  //   };
  // }, [authReducer.user.uid]);
  return (
    <Box>
      <Typography variant="h6">Channels</Typography>
      <List sx={{ mx: -2 }}>
        {channelReducer.channels?.map((channel) => (
          <ListItem disablePadding key={channel.id}>
            <ListItemButton>
              <ListItemIcon>
                <TagIcon />
              </ListItemIcon>
              <ListItemText primary={channel.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Button startIcon={<AddBoxOutlinedIcon />} variant="text">
        Add Channels
      </Button>
    </Box>
  );
};

export default ChannelList;
