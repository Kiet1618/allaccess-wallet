import React, { useEffect, useState } from "react";
import Web3 from "web3";
import { Grid } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import { sliceAddress } from "../../utils";
import { useAppSelector, useAppDispatch } from "../../store";
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
type ListTokenBalance = Token & {
  balance?: string;
  balanceUsd?: string;
};
import Cookies from "universal-cookie";

import axios from "axios";
const convertTokenBalanceURL = `https://min-api.cryptocompare.com/data/price?fsym={symbol}&tsyms=USD`;
const getUSDPrice = async (symbol: string) => {
  try {
    const url = convertTokenBalanceURL.replace("{symbol}", symbol);
    const response = await axios.get(url);
    const { USD } = response.data;
    return USD;
  } catch (error) {
    console.error("Error fetching USD price:", error);
    return "";
  }
};
import { setNetworkState } from "@app/store/redux/network/actions";
import { listNetWorks } from "@app/configs/data";
import { ChainNetwork } from "@app/types/blockchain.type";
import { LoginRequestModal } from "@app/components";

const Overview = () => {
  const historyState = useAppSelector(state => state.history);
  const cookies = new Cookies();
  //const [number, setNumber] = useState(6);
  const number = 6;
  const listTokenState = useAppSelector(state => state.token);
  const [listTokensBalance, setListTokensBalance] = useState<ListTokenBalance[]>(listTokenState.currentListTokens.data);
  const networkState = useAppSelector(state => state.network);
  const [currenToken, setCurrenToken] = useState(listTokenState.currentListTokens.data.find(token => token.chainID === networkState.currentNetwork.data.chainID)?.symbol as string);
  const { web3, account: myAddress } = useBlockchain();
  const [balance, setBalance] = useState("");
  const [balanceUSD, setBalanceUSD] = useState("");
  const [searchText, setSearchText] = useState("");
  const [origin, setOrigin] = useState<string | null>("");
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setCurrenToken(listTokenState.currentListTokens.data.find(e => e.chainID === networkState.currentNetwork.data.chainID)?.symbol as string);
      } catch (e) {
        console.log(e);
      }
      try {
        const balance = await getBalance(web3 as Web3);
        setBalance(balance);
      } catch (error) {
        setBalance("Error");
      }
      try {
        const USD: string = await getUSDPrice(networkState.currentNetwork.data.title);
        const balance = await getBalance(web3 as Web3);
        const balanceUSD = parseFloat(USD) * parseFloat(balance);
        setBalanceUSD(balanceUSD.toString());
      } catch (error) {
        setBalanceUSD("N/A");
      }
      try {
        const updateBalance = await Promise.all(
          listTokensBalance.map(async item => {
            try {
              const result = await handleGetBalance(item);
              return {
                ...item,
                balance: result.balance,
                balanceUsd: result.balanceUsd,
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
  });

  const handleGetBalance = async (item: Token) => {
    type Result = {
      balance: string;
      balanceUsd: string;
    };
    let result: Result = {
      balance: "N/A",
      balanceUsd: "N/A",
    };
    item.tokenContract ? (result.balance = await getBalanceToken(web3 as Web3, item.tokenContract)) : (result.balance = await getBalance(web3 as Web3).then());
    const USD: string = await getUSDPrice(item.symbol);
    result.balanceUsd = (parseFloat(USD) * parseFloat(result.balance)).toString();
    return result;
  };
  //REQ login
  //req login
  // const networkState = useAppSelector(state => state.network);

  // const testAddress = networkState.currentNetwork.data.chainID === "flow-testnet" ? getTorusKey().flowAddress : getTorusKey().ethAddress;

  const handleLogin = () => {
    const handlePopupResponse = (event: any) => {
      if (event.data.type === "LOGIN_REQ") {
        const data = event.data.data;
        cookies.set("chainId", data.chainId);
        setOrigin(data.origin);
        const currentNetwork = listNetWorks.find(network => network.chainID === data.chainId) as ChainNetwork;
        dispatch(setNetworkState(currentNetwork));
        console.log("a");
      }
    };
    window.addEventListener("message", handlePopupResponse);
  };
  const handleComfirmRequest = () => {
    const handlePopupResponse = (event: any) => {
      window.addEventListener("beforeunload", () => {
        event.source.postMessage({ type: "ADDRESS", data: myAddress }, event.origin);
      });
      setOrigin("");
      window.close();
    };
    window.addEventListener("message", handlePopupResponse);
  };
  const handleReject = () => {
    const handleReject = (event: any) => {
      window.addEventListener("beforeunload", () => {
        event.source.postMessage({ type: "ADDRESS", data: "" }, event.origin);
      });
      setOrigin("");
      window.close();
    };
    window.addEventListener("message", handleReject);
  };
  useEffect(() => {
    handleLogin();
  }, []);
  return (
    <Page>
      <LoginRequestModal
        title='Login request'
        subTitle='Login request from Marketplace'
        loading={false}
        origin={origin}
        handleClose={() => {
          handleReject();
        }}
        handleConfirm={handleComfirmRequest}
      />
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
                <ChooseToken style={{ marginRight: "10px" }} />
                {balanceUSD + "$"}
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
                  .filter(token => token.chainID === networkState.currentNetwork.data.chainID)
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
                        <TextCoin> {item.balance}</TextCoin>
                        {"~ $" + item.balanceUsd}
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
