import { Grid } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChatWindow from "../../components/ChatWindow";
import Sidebar from "../../components/Sidebar";
import { getRealtimeChannels } from "../../redux/actions/channelAction";

const Home = () => {
  const {
    authReducer: {
      user: { uid },
    },
  } = useSelector((state) => state);

  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = dispatch(getRealtimeChannels(uid));

    return unsubscribe;
  }, [uid]);

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
