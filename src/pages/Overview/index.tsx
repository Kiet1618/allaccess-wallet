import React, { useEffect, useState } from "react";
import Web3 from "web3";
import { Grid } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import { sliceAddress } from "../../utils";
import { useAppSelector } from "../../store";
import { Page } from "../../styles";
import { TitlePage } from "../../styles";
import { Token } from "../../types/blockchain.type";
import { ChooseToken } from "../../assets/icon";
import CustomButton from "../../components/Button";
import SearchComponent from "../../components/TextField";
import { NetworkContainer } from "../../components/Network";
import { formatValue, useBlockchain, getBalance, getBalanceToken } from "../../blockchain";
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
import { getTorusKey } from "../../storage/storage-service";
type ListTokenBalance = Token & {
  balance?: string;
};
const Overview = () => {
  const myAddress = getTorusKey()?.ethAddress;
  const historyState = useAppSelector(state => state.history);
  //const [number, setNumber] = useState(6);
  const number = 6;
  const listTokenState = useAppSelector(state => state.token);

  const [listTokensBalance, setListTokensBalance] = useState<ListTokenBalance[]>(listTokenState.currentListTokens.data);
  const networkState = useAppSelector(state => state.network);
  const [currenToken, setCurrenToken] = useState(listTokenState.currentListTokens.data.find(token => token.rpcUrls === networkState.currentListTokens.data)?.symbol as string);
  const { web3 } = useBlockchain(networkState.currentListTokens.data);
  const [balance, setBalance] = useState("");
  const [searchText, setSearchText] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        setCurrenToken(listTokenState.currentListTokens.data.find(e => e.rpcUrls === networkState.currentListTokens.data)?.symbol as string);
      } catch (e) {
        console.log(e);
      }
      try {
        const balance = await getBalance(web3 as Web3);
        setBalance(balance);
      } catch (error) {
        console.log(error);
        setBalance("Error");
      }
      try {
        const updateBalance = await Promise.all(
          listTokensBalance.map(async item => {
            try {
              const balance = await handleGetBalance(item);
              return {
                ...item,
                balance: balance,
              };
            } catch (error) {
              console.log(error);
              return item;
            }
          })
        );
        setListTokensBalance(updateBalance);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [networkState.currentListTokens.data]);

  const handleGetBalance = async (item: Token) => {
    let result: string;
    item.tokenContract ? (result = await getBalanceToken(web3 as Web3, item.tokenContract)) : (result = await getBalance(web3 as Web3).then());
    return result;
  };

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
              {listTokensBalance ? (
                listTokensBalance
                  .filter(token => token.rpcUrls === networkState.currentListTokens.data)
                  .filter(
                    searchText
                      ? token =>
                          token.symbol.toLowerCase().includes(searchText.toLowerCase()) || token.name.toLowerCase().includes(searchText.toLowerCase()) || token.tokenContract?.includes(searchText)
                      : token => token
                  )
                  .map(item => (
                    <ItemMyAssets key={item.symbol}>
                      <ItemMyAssetsLeft>
                        <img style={{ marginRight: "10px" }} width={"30px"} src={item.img}></img>
                        <TextCoin>{item.name}</TextCoin>
                        {item.symbol}
                      </ItemMyAssetsLeft>
                      <ItemMyAssetsRight>
                        <TextCoin> {item.balance}</TextCoin>~ $0.6868
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
