import React from "react";
import { Grid } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import CustomInput from "../../../components/TextField";
import CustomButton from "../../../components/Button";
import { Copy } from "../../../assets/icon";
import { sliceAddress, copyAddress } from "../../../utils";
import { TitlePageBlack } from "../../../styles";
import { BackgroundPage, TitlePageContainer } from "../profile.css";
import { SubTitlePage, CopyAddressContainer, ContainerTextField } from "../../Transaction/transaction.css";
import { ContainerAvatar, ContainerInfo } from "./info.css";
const Info = () => {
  const myAdress = "0x04E407C7d7C2A6aA7f2e66B0B8C0dBcafA5E3Afe";
  return (
    <>
      <TitlePageContainer>
        <TitlePageBlack>This is your profile</TitlePageBlack>
        <SubTitlePage>You need to choose the correct network, address and coin to transfer to another wallet address.</SubTitlePage>
      </TitlePageContainer>
      <Grid container columns={{ xs: 100, sm: 100, md: 100, lg: 100, xl: 100 }}>
        <Grid item xs={100} lg={70}>
          <BackgroundPage>
            <Grid container columns={{ xs: 100, sm: 100, md: 100, lg: 100, xl: 100 }}>
              <Grid item xs={100} md={30}>
                <ContainerAvatar>
                  <Avatar alt='Remy Sharp' src='https://images.ctfassets.net/fu9did2d8yaw/2rUzSj8VDtr9YBmrU61c2G/a84a48f14f027886374cc618df4ae176/BAYC.png' sx={{ width: 200, height: 200 }} />
                  <CustomButton mTop='20px' mBottom='20px' text='Change avatar' styleButton='primary'></CustomButton>
                  <CopyAddressContainer onClick={() => copyAddress(myAdress)}>
                    {sliceAddress(myAdress)} <Copy />
                  </CopyAddressContainer>
                </ContainerAvatar>
              </Grid>
              <Grid item xs={100} md={70}>
                <ContainerInfo>
                  <ContainerTextField>
                    <label>User name</label>
                    <CustomInput size='small' fullWidth value={"Kiet Tran"} styleTextField='default' disabled></CustomInput>
                  </ContainerTextField>
                  <ContainerTextField>
                    <label>Gmail</label>
                    <CustomInput size='small' fullWidth value={"kiettran@lecle.co.kr"} styleTextField='default' disabled></CustomInput>
                  </ContainerTextField>
                  {/* <CustomButton width="40%" mLeft="60%" mTop="20px" mBottom="20px" text="Update" styleButton="primary" ></CustomButton> */}
                </ContainerInfo>
              </Grid>
            </Grid>
          </BackgroundPage>
        </Grid>
      </Grid>
    </>
  );
};
export default Info;
