import { Page } from "../../styles";
import { Grid } from "@mui/material";
import { NetworkContainer } from "../../components/Network";
import { myListCoin, rows } from "../../configs/data/test";
import { listNetWorks } from "../../configs/data/blockchain";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { sliceAddress } from "../../utils";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { formatValue, sendTransaction, getBalanceToken, useBlockchain, getBalance } from "../../blockchain";
import { get } from "lodash";
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
import { TitlePage } from "../../styles";
import { ChooseToken } from "../../assets/icon";
import SearchComponent from "../../components/TextField";
import { SearchIcon, ReceiveTransactionHistory, SendTransactionHistory, LinkTransaction, Empty } from "../../assets/icon";
import CustomButton from "../../components/Button";
import axios from "axios";
import Web3 from "web3";
const Overview = () => {
  const myAddress = "0x04E407C7d7C2A6aA7f2e66B0B8C0dBcafA5E3Afe";
  const [number, setNumber] = useState(6);
  const listTokenState = useAppSelector(state => state.token);
  const networkState = useAppSelector(state => state.network);
  const [currenToken, setCurrenToken] = useState(listTokenState.currentListTokens.data.find(token => token.rpcUrls === networkState.currentListTokens.data)?.symbol as string);

  const { web3 } = useBlockchain(networkState.currentListTokens.data);
  const getHistoryTransaction = async () => {
    const currentNetwork = listNetWorks.find(network => network.rpcUrls === networkState.currentListTokens.data);
    const urlRawNormalTransaction = currentNetwork?.apiScanNormalTransactionsByAddress as string;
    const urlNormalTransaction = urlRawNormalTransaction.replace("{address}", myAddress);
    const normalTransaction = await axios.get(urlNormalTransaction);
    const { data } = normalTransaction;
    const result = get(data, "result", []);

    const listToken = listTokenState.currentListTokens.data.filter(tokens => tokens.rpcUrls === networkState.currentListTokens.data && tokens.tokenContract !== undefined);

    const listHistory = await Promise.all(
      listToken.map(async token => {
        const urlRawTokenTransaction = currentNetwork?.apiScanTokenTransactionsByAddress as string;
        const urlTokenTransaction = urlRawTokenTransaction.replace("{address}", myAddress).replace("{contract}", token.tokenContract as string);
        const tokenTransaction = await axios.get(urlTokenTransaction);
        const { data } = tokenTransaction;
        return get(data, "result", []);
      })
    );

    const flattenedListHistory = listHistory.flat();
    return [...result, ...flattenedListHistory];
  };

  const [data, setData] = useState<Array<any>>();
  useEffect(() => {
    try {
      setCurrenToken(listTokenState.currentListTokens.data.find(e => e.rpcUrls === networkState.currentListTokens.data)?.symbol as string);
      setNumber(6);
    } catch {}
  }, [networkState.currentListTokens.data]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await getHistoryTransaction();
      setData(result);
    };
    fetchData();
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
                <TextBlue>1.868 BTC </TextBlue>
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
              />
            </SearchContainer>
          </OverviewHeaderTopCoin>

          <ContentPageContainer>
            <ListItemMyAssets>
              {listTokenState.currentListTokens.data ? (
                listTokenState.currentListTokens.data
                  .filter(token => token.rpcUrls === networkState.currentListTokens.data)
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
              {data?.length ? (
                data.slice(0, number).map(item => (
                  <ItemMyAssets key={item.blockHash}>
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
                      spaceBetween={true}
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
            <CustomButton onClick={() => setNumber(data?.length ? data?.length : 0)} width='100%' border='none' text='View all transactions'></CustomButton>
          </OverviewHeaderTopCoin>
        </Grid>
      </Grid>
    </Page>
  );
};

export default Overview;
