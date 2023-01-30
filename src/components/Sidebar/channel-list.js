import { Box, Button, Typography } from "@mui/material";
import React from "react";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";

const ChannelList = () => {
  return (
    <Box>
      <Typography>Channels</Typography>
      <Button startIcon={<AddBoxOutlinedIcon />} variant="text">
        Add Channels
      </Button>
    </Box>
  );
};

export default ChannelList;
