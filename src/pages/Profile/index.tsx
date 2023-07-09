import React from "react";
import { Page } from "../../styles";
import { TabPanel, a11yProps } from "../../utils";
import { OverviewHeaderTopCoin } from "../Overview/overview.css";
import { TabsCustom, TabTransfer } from "../Transaction/transaction.css";

import MFA from "./MFA";
import Info from "./Info";
const Profile = () => {
  const [value, setValue] = React.useState(1);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <Page>
      <OverviewHeaderTopCoin>
        <TabsCustom value={value} onChange={handleChange} aria-label='basic tabs example'>
          <TabTransfer label='Profile' {...a11yProps(0)} />
          <TabTransfer label='2FA Setting' {...a11yProps(1)} />
        </TabsCustom>
      </OverviewHeaderTopCoin>
      <TabPanel value={value} index={0}>
        <Info />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <MFA />
      </TabPanel>
    </Page>
  );
};

export default Profile;
