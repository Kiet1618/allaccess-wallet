import React from "react";
import { Grid } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { TextField as CustomInput, Button as CustomButton } from "@app/components";
import { Copy } from "@app/assets/icon";
import { sliceAddress, copyAddress } from "@app/utils";
import { TitlePageBlack } from "@app/styles";
import { useBlockchain } from "@app/blockchain";
import { BackgroundPage, TitlePageContainer } from "../profile.css";
import { SubTitlePage, CopyAddressContainer, ContainerTextField } from "../../Transaction/transaction.css";
import { ContainerAvatar, ContainerInfo } from "./info.css";
import { useAppSelector } from "@app/store";

const Info = () => {
  const { account: myAddress } = useBlockchain();
  const profileState = useAppSelector(state => state.profile);
  console.log(profileState.profileInfo.data);
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
                  <Avatar alt='Remy Sharp' src={profileState.profileInfo.data.avatar} sx={{ width: 200, height: 200 }} />
                  <CopyAddressContainer style={{ margin: "20px 0" }} onClick={() => copyAddress(myAddress)}>
                    {sliceAddress(myAddress)} <Copy />
                  </CopyAddressContainer>
                </ContainerAvatar>
              </Grid>
              <Grid item xs={100} md={70}>
                <ContainerInfo>
                  <ContainerTextField>
                    <label>User name</label>
                    <CustomInput size='small' fullWidth value={profileState.profileInfo.data.userName} styleTextField='default' disabled></CustomInput>
                  </ContainerTextField>
                  <ContainerTextField>
                    <label>Gmail</label>
                    <CustomInput size='small' fullWidth value={profileState.profileInfo.data.email} styleTextField='default' disabled></CustomInput>
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
