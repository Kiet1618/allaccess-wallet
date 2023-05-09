import { Page } from "../../styles";
import { Grid, Container } from "@mui/material";
import { NetworkContainer } from "../../components/Network";
import { myListCoin, historyData } from "../../configs/data/test";
import {
  HeaderPageContainer,
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
  LinkImage,
  ContentPageContainer,
} from "./overview.css";
import { TitlePage } from "../../styles";
import { ChooseToken } from "../../assets/icon";
import SearchComponet from "../../components/TextField";
import { SearchIcon, ReceiveTransactionHistoty, SendTransactionHistoty, LinkTransaction } from "../../assets/icon";
import { LinkIcon } from "../../assets/img";

import CustomButton from "../../components/Button";
const Overview = () => {
  const myAdress = "0x15375...b080f";
  return (
    <Page>
      <Grid container columns={{ xs: 100, sm: 100, md: 100, lg: 100 }}>
        <Grid item xs={55} sm={55} md={55} lg={55}>
          <HeaderPageContainer>
            <TitlePage>My wallet overview</TitlePage>
            <SubHeaderPage>Estimated balance</SubHeaderPage>
            <BalanceContainer>
              <TextBlue>1.868 BTC </TextBlue>
              <ChooseToken /> ~ $56,040
            </BalanceContainer>
            <Divider />
          </HeaderPageContainer>
        </Grid>
        <Grid item xs={45} sm={45} md={45} lg={45}>
          <NetworkContainer />
        </Grid>
        <Grid item xs={55} sm={55} md={55} lg={55}>
          <OverviewHeaderTopCoin>
            <TextHeaderOverview>My Assets</TextHeaderOverview>
            <SearchContainer>
              <SearchComponet
                InputProps={{
                  startAdornment: <SearchIcon />,
                }}
                placeholder={"Search"}
                size='small'
                hiddenLabel
                fullWidth
                color='primary'
                styleTextField='default'
                width='300px'
              />
            </SearchContainer>
          </OverviewHeaderTopCoin>
          <ContentPageContainer>
            <ListItemMyAssets>
              {myListCoin.map(item => (
                <ItemMyAssets>
                  <ItemMyAssetsLeft>
                    <img style={{ marginRight: "10px" }} width={"30px"} src={item.img}></img>
                    <TextCoin>{item.name}</TextCoin>
                    {item.symbol}
                  </ItemMyAssetsLeft>
                  <ItemMyAssetsRight>
                    <TextCoin> {item.balance} </TextCoin>~ $0.6868
                  </ItemMyAssetsRight>
                </ItemMyAssets>
              ))}
            </ListItemMyAssets>
          </ContentPageContainer>
        </Grid>
        <Grid item xs={45} sm={45} md={45} lg={45}>
          <OverviewHeaderTopCoin>
            <TextHeaderOverview>Recent transactions</TextHeaderOverview>
          </OverviewHeaderTopCoin>
          <ContentPageContainer>
            <ListItemMyAssets>
              {historyData.map(item => (
                <ItemMyAssets>
                  <TransactionLinkContainer>
                    <LinkImage>
                      <img src={LinkIcon}></img>
                    </LinkImage>
                    <div>
                      <FromToAddressContainer>
                        <span style={{ color: "#42526E" }}> From: </span> <span style={{ color: "#346FBE" }}>{item.from}</span>
                      </FromToAddressContainer>
                      <FromToAddressContainer>
                        <span style={{ color: "#42526E" }}> To: </span> <span style={{ color: "#346FBE" }}>{item.to}</span>
                      </FromToAddressContainer>
                    </div>
                  </TransactionLinkContainer>
                  <CustomButton text={item.balance + " ETH"} styleButton='default' iconRight={item.from === myAdress ? SendTransactionHistoty : ReceiveTransactionHistoty}></CustomButton>
                </ItemMyAssets>
              ))}
            </ListItemMyAssets>
          </ContentPageContainer>
        </Grid>
      </Grid>
    </Page>
  );
};

export default Overview;
