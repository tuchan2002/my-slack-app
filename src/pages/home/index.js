import { Grid } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChatWindow from "../../components/ChatWindow";
import Sidebar from "../../components/Sidebar";
import {
  getRealtimeChannels,
  getRealtimeMemberInChannel,
} from "../../redux/actions/channelAction";
import { getRealtimeMessagesByChannel } from "../../redux/actions/messageAction";

const Home = () => {
  const {
    authReducer: {
      user: { uid },
    },
    channelReducer: { selectedChannel },
  } = useSelector((state) => state);

  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = dispatch(getRealtimeChannels(uid));

    return unsubscribe;
  }, [uid]);

  useEffect(() => {
    const unsubscribe = dispatch(
      getRealtimeMemberInChannel(selectedChannel?.members || [""])
    );

    return unsubscribe;
  }, [selectedChannel?.members]);

  return (
    <Grid container>
      <Grid item xs={3}>
        <Sidebar />
      </Grid>
      <Grid item xs={9}>
        <ChatWindow />
      </Grid>
    </Grid>
  );
};

export default Home;
