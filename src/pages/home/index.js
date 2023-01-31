import { Grid } from "@mui/material";
import React from "react";
import ChatWindow from "../../components/ChatWindow";
import Sidebar from "../../components/Sidebar";

const Home = () => {
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
