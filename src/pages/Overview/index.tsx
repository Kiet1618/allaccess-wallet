import React, { useEffect, useState } from "react";
import Web3 from "web3";
import { Grid } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import { sliceAddress } from "../../utils";
import { useAppSelector } from "../../store";
import { Page } from "../../styles";
import { TitlePage } from "../../styles";
import { ChooseToken } from "../../assets/icon";
import CustomButton from "../../components/Button";
import SearchComponent from "../../components/TextField";
import { NetworkContainer } from "../../components/Network";
import { formatValue, useBlockchain, getBalance } from "../../blockchain";
import { SearchIcon, ReceiveTransactionHistory, SendTransactionHistory, LinkTransaction, Empty } from "../../assets/icon";
import {
  NetworkContainerFixed,
  SubHeaderPage,
  BalanceContainer,
  TextBlue,
  Divider,
  OverviewHeaderTopCoin,
  SearchContainer,
  TextHeaderOverview,
  ListItemMyAssets,
  ItemMyAssets,
  ItemMyAssetsLeft,
  ItemMyAssetsRight,
  TextCoin,
  FromToAddressContainer,
  TransactionLinkContainer,
  HeaderPageBalance,
  ContentPageContainer,
  TilePageContainer,
  EmptyContainer,
} from "./overview.css";

const Overview = () => {
  const myAddress = "0x04e407c7d7c2a6aa7f2e66b0b8c0dbcafa5e3afe";
  const historyState = useAppSelector(state => state.history);
  //const [number, setNumber] = useState(6);
  const number = 6;
  const listTokenState = useAppSelector(state => state.token);
  const networkState = useAppSelector(state => state.network);
  const [currenToken, setCurrenToken] = useState(listTokenState.currentListTokens.data.find(token => token.rpcUrls === networkState.currentListTokens.data)?.symbol as string);
  const { web3 } = useBlockchain(networkState.currentListTokens.data);
  const [balance, setBalance] = useState("");
  const [searchText, setSearchText] = useState("");
  useEffect(() => {
    try {
      setCurrenToken(listTokenState.currentListTokens.data.find(e => e.rpcUrls === networkState.currentListTokens.data)?.symbol as string);
    } catch (e) {
      console.log(e);
    }
    try {
      getBalance(web3 as Web3).then(res => setBalance(res));
    } catch {
      setBalance("Error");
    }
  }, [networkState.currentListTokens.data]);

  return (
    <Page>
      <Grid container columns={{ xs: 100, sm: 100, md: 100, lg: 100, xl: 100 }}>
        <Grid item xs={100} sm={100} md={100} lg={50} xl={60}>
          <TilePageContainer>
            <TitlePage>My wallet overview</TitlePage>
          </TilePageContainer>
        </Grid>
        <Grid item xs={100} sm={100} md={50} lg={50} xl={40}>
          <NetworkContainerFixed>
            <NetworkContainer />
          </NetworkContainerFixed>
        </Grid>
        <Grid container columns={{ xs: 100, sm: 100, md: 100, lg: 100, xl: 100 }}>
          <Grid item xs={100} sm={100} md={100} lg={50} xl={60}>
            <HeaderPageBalance>
              <SubHeaderPage>Estimated balance</SubHeaderPage>
              <BalanceContainer>
                <TextBlue>
                  {balance} {currenToken}{" "}
                </TextBlue>
                <ChooseToken /> ~ $56,040
              </BalanceContainer>
              <Divider />
            </HeaderPageBalance>
          </Grid>
        </Grid>
      </Grid>
      <Grid container columns={{ xs: 100, sm: 100, md: 100, lg: 100, xl: 100 }}>
        <Grid item xs={100} sm={100} md={100} lg={50} xl={60}>
          <OverviewHeaderTopCoin>
            <TextHeaderOverview>My Assets</TextHeaderOverview>
            <SearchContainer>
              <SearchComponent
                InputProps={{
                  startAdornment: <SearchIcon />,
                }}
                placeholder={"Search"}
                size='small'
                hiddenLabel
                fullWidth
                color='primary'
                styleTextField='disable'
                width='100%'
                onChange={e => setSearchText(e.target.value)}
              />
            </SearchContainer>
          </OverviewHeaderTopCoin>

          <ContentPageContainer>
            <ListItemMyAssets>
              {listTokenState.currentListTokens.data ? (
                listTokenState.currentListTokens.data
                  .filter(token => token.rpcUrls === networkState.currentListTokens.data)
                  .filter(searchText ? token => token.symbol.toLowerCase().includes(searchText.toLowerCase()) || token.name.toLowerCase().includes(searchText.toLowerCase()) : token => token)
                  .map(item => (
                    <ItemMyAssets key={item.symbol}>
                      <ItemMyAssetsLeft>
                        <img style={{ marginRight: "10px" }} width={"30px"} src={item.img}></img>
                        <TextCoin>{item.name}</TextCoin>
                        {item.symbol}
                      </ItemMyAssetsLeft>
                      <ItemMyAssetsRight>
                        <TextCoin> 0.12 </TextCoin>~ $0.6868
                      </ItemMyAssetsRight>
                    </ItemMyAssets>
                  ))
              ) : (
                <EmptyContainer>
                  <div>
                    <Empty></Empty>
                    <p>Assets not found in your wallet</p>
                  </div>
                </EmptyContainer>
              )}
            </ListItemMyAssets>
          </ContentPageContainer>
        </Grid>
        <Grid item xs={100} sm={100} md={100} lg={50} xl={40}>
          <OverviewHeaderTopCoin>
            <TextHeaderOverview>Recent transactions</TextHeaderOverview>
          </OverviewHeaderTopCoin>
          <ContentPageContainer>
            <ListItemMyAssets>
              {historyState.getHistoriesAddress.data?.length ? (
                historyState.getHistoriesAddress.data.slice(0, number).map(item => (
                  <ItemMyAssets key={item.id}>
                    <TransactionLinkContainer>
                      <Tooltip title='Link to view full about this transaction' placement='top-start'>
                        <IconButton>
                          <LinkTransaction />
                        </IconButton>
                      </Tooltip>
                      <div>
                        <FromToAddressContainer>
                          <span style={{ color: "#42526E" }}> From: </span> <span style={{ color: "#346FBE" }}>{sliceAddress(item.from)}</span>
                        </FromToAddressContainer>
                        <FromToAddressContainer>
                          <span style={{ color: "#42526E" }}> To: </span> <span style={{ color: "#346FBE" }}>{sliceAddress(item.to)}</span>
                        </FromToAddressContainer>
                      </div>
                    </TransactionLinkContainer>
                    <CustomButton
                      width='150px'
                      text={(item.value ? formatValue(web3 as Web3, item.value as string) : "Error") + " " + (item.tokenSymbol ? item.tokenSymbol : currenToken)}
                      styleButton='default'
                      iconRight={item.from === myAddress ? SendTransactionHistory : ReceiveTransactionHistory}
                    ></CustomButton>
                  </ItemMyAssets>
                ))
              ) : (
                <EmptyContainer>
                  <div>
                    <Empty></Empty>
                    <p>Assets not found in your wallet</p>
                  </div>
                </EmptyContainer>
              )}
            </ListItemMyAssets>
          </ContentPageContainer>
          <OverviewHeaderTopCoin>
            <CustomButton width='100%' border='none' text='View all transactions' />
          </OverviewHeaderTopCoin>
        </Grid>
      </Grid>
    </Page>
  );
};

export default Overview;
