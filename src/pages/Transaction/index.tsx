import { Grid } from "@mui/material";
import { Page } from "../../styles";
import { NetworkContainer } from "../../components/Network";
import { OverviewHeaderTopCoin } from "../Overview/overview.css";
import React, { useState } from "react";
import Transfer from "./Transfer";
import { TabsCustom, TabTransfer, NetworkContainerFixed } from "./transaction.css";
import Receive from "./Receive";
import { TabPanel, a11yProps } from "../../utils";

const Transaction = () => {
  const [value, setValue] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Page>
      <Grid container columns={{ xs: 100, sm: 100, md: 100, lg: 100, xl: 100 }}>
        <Grid item xs={100} sm={100} md={100} lg={50} xl={60}>
          <OverviewHeaderTopCoin>
            <TabsCustom value={value} onChange={handleChange} aria-label='basic tabs example'>
              <TabTransfer label='Transfer' {...a11yProps(0)} />
              <TabTransfer label='Receive' {...a11yProps(1)} />
            </TabsCustom>
          </OverviewHeaderTopCoin>
        </Grid>
        <Grid item xs={100} sm={100} md={50} lg={50} xl={40}>
          <NetworkContainerFixed>
            <NetworkContainer />
          </NetworkContainerFixed>
        </Grid>
        <TabPanel value={value} index={0}>
          <Transfer />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Receive />
        </TabPanel>
      </Grid>
    </Page>
  );
};
export default Transaction;
