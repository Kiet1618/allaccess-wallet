import { Page } from "../../styles";
import styled from "styled-components";
import { OverviewHeaderTopCoin, TextHeaderOverview } from "../Overview/overview.css";
import Typography from "@mui/material/Typography";
import base from "../../styles/theme/base";
import { createBreakpoint } from "styled-components-breakpoint";
import { TabsCustom, TabTransfer } from "../Transaction";
import React from "react";
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
const breakpoint = createBreakpoint(base.breakpoints);

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div role='tabpanel' hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && (
        <OverviewHeaderTopCoin>
          <Typography>{children}</Typography>
        </OverviewHeaderTopCoin>
      )}
    </div>
  );
}
function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
const Profile = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <Page>
      <OverviewHeaderTopCoin>
        <TabsCustom value={value} onChange={handleChange} aria-label='basic tabs example'>
          <TabTransfer label='Profile' {...a11yProps(0)} />
          <TabTransfer label='MFA Setting' {...a11yProps(1)} />
        </TabsCustom>
      </OverviewHeaderTopCoin>
    </Page>
  );
};

export default Profile;
