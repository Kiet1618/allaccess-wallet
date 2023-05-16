import { Page, TitlePage } from "../../styles";
import base from "../../styles/theme/base";
import { createBreakpoint } from "styled-components-breakpoint";
import React from "react";
import styled from "styled-components";
const breakpoint = createBreakpoint(base.breakpoints);
import { ContainerTextField, SpanRed } from "../Transaction";
import { Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import CustomButton from "../../components/Button";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import CustomInput from "../../components/TextField";
import Select from "@mui/material/Select";
import { NetworkContainer } from "../../components/Network";
import { myListCoin } from "../../configs/data/test";
import { OverviewHeaderTopCoin, TextHeaderOverview } from "../Overview/overview.css";
import FormGroup from "@mui/material/FormGroup";
import { Controller, useForm } from "react-hook-form";
import { SelectCoin } from "../Transaction";
const History = () => {
  const myAddress = "0x04E407C7d7C2A6aA7f2e66B0B8C0dBcafA5E3Afe";
  const [time, setTime] = React.useState("30");
  return (
    <Page>
      <TilePageContainer>
        <TitlePage>Transactions history</TitlePage>
        <SubTitlePage>View all your transfers and receive transaction in your wallet.</SubTitlePage>
        <ContainerFilter>
          <ContainerTextField>
            <label>Time</label>
            <CustomInput value={time} styleTextField='default' select id='token' size='small' onChange={e => setTime(e.target.value)}>
              {myListCoin.map(coin => (
                <MenuItem value={coin.symbol}>
                  <SelectCoin>
                    <img width={"20px"} src={coin.img}></img>
                    {coin.name}
                  </SelectCoin>
                </MenuItem>
              ))}
            </CustomInput>
          </ContainerTextField>
        </ContainerFilter>
      </TilePageContainer>
    </Page>
  );
};
export default History;
const ContainerFilter = styled.div`
  display: flex;
  align-items: center;
`;

export const TilePageContainer = styled.div`
  ${breakpoint("xs")`
    margin: 0px 10px;
`}
  ${breakpoint("lg")`
    margin: 22px 44px;
  `}
  position: static;
  justify-content: center;
  align-items: center;
`;

const SubTitlePage = styled.div`
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  font-size: ${({ theme }) => theme.fontSizes.xs + "px"};
  line-height: 24px;

  color: ${({ theme }) => theme.colors.neutrals.gray600};
  ${breakpoint("xs")`
    width: 100%;
`}
  ${breakpoint("sm")`
     margin: 20px 0;
     width: 100%;
  `}
  ${breakpoint("md")`
     margin: 20px 0;
     width: 100%;
  `}
  ${breakpoint("lg")`
     margin: 20px 0;
     width: 60%;
  `}
`;
