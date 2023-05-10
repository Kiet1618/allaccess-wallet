import { Grid } from "@mui/material";
import { Page } from "../../styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import React from "react";
import CustomButton from "../../components/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import CustomInput from "../../components/TextField";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { NetworkContainer } from "../../components/Network";
import { myListCoin, historyData } from "../../configs/data/test";

import { HeaderPageContainer, TilePageContainer, HaaderPageBalance, OverviewHeaderTopCoin, TextHeaderOverview } from "../Overview/overview.css";
import { TitlePage } from "../../styles";
import styled from "styled-components";
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
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
const Transaction = () => {
  const [value, setValue] = React.useState(0);
  const [token, setToken] = React.useState("ETH");

  const handleChange2 = (event: SelectChangeEvent) => {
    setToken(event.target.value as string);
  };
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <Page>
      <Grid container columns={{ xs: 100, sm: 100, md: 100, lg: 100, xl: 100 }}>
        <Grid item xs={100} sm={100} md={50} lg={50} xl={60}>
          <OverviewHeaderTopCoin>
            <Tabs value={value} onChange={handleChange} aria-label='basic tabs example'>
              <Tab label='Transfer' {...a11yProps(0)} />
              <Tab label='Receive' {...a11yProps(1)} />
            </Tabs>
          </OverviewHeaderTopCoin>
        </Grid>
        <Grid item xs={100} sm={100} md={50} lg={50} xl={40}>
          <HeaderPageContainer>
            <NetworkContainer />
          </HeaderPageContainer>
        </Grid>
        <Grid item xs={100} sm={100} md={50} lg={50} xl={60}>
          <TabPanel value={value} index={0}>
            <TitlePage>Transfer your Ethereum</TitlePage>

            <SubHeaderPage>You need to choose the correct network, address and coin to transfer to another wallet address.</SubHeaderPage>
            <BackgroundPage>
              <FormControl fullWidth>
                <InputLabelCustom required id='select-token'>
                  Select coin
                </InputLabelCustom>
                <SelectCustom labelId='select-token' id='token' value={token} label='Select coin' onChange={handleChange2}>
                  {myListCoin.map(coin => (
                    <MenuItem value={coin.symbol}>
                      <SelectCoin>
                        <img width={"20px"} src={coin.img}></img>
                        {coin.name}
                      </SelectCoin>
                    </MenuItem>
                  ))}
                </SelectCustom>
                <CustomInput styleTextField='default' label='Transfer to' required></CustomInput>
                <CustomInput styleTextField='default' label='Amount' required></CustomInput>
                <ContainerFlexSpace>
                  <div>Maxium desposit</div>
                  <div>0.00001 ETH</div>
                </ContainerFlexSpace>
                <ContainerFlexSpace>
                  <div>Network desposit</div>
                  <div>$12.34</div>
                </ContainerFlexSpace>
                <ContainerFlexSpace>
                  <TextHeaderOverview>Total cost</TextHeaderOverview>
                  <TextHeaderOverview>$12.34</TextHeaderOverview>
                </ContainerFlexSpace>
                <CustomButton text='Transfer' styleButton='primary' width='200px' height='50px'></CustomButton>
              </FormControl>
            </BackgroundPage>
          </TabPanel>
          <TabPanel value={value} index={1}>
            Item Two
          </TabPanel>
        </Grid>
      </Grid>
    </Page>
  );
};
export default Transaction;
const SubHeaderPage = styled.div`
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  font-size: ${({ theme }) => theme.fontSizes.xs + "px"};
  line-height: 24px;
  margin-top: 20px;
  width: 60%;
  color: ${({ theme }) => theme.colors.neutrals.gray600};
  margin-bottom: 20px;
`;

const BackgroundPage = styled.div`
  background-color: #fafafa;
  padding: 40px;
  border-radius: 8px;
`;

const SelectCoin = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  img {
    margin-right: 10px;
  }
`;
const SelectCustom = styled(Select)`
  border-radius: 8px !important;
`;
const InputLabelCustom = styled(InputLabel)`
  border-radius: 8px !important;
`;
const ContainerFlexSpace = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
