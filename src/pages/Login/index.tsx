import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import useSnackbar from "@mui/base/useSnackbar";
import { GoogleLogin, GoogleLoginProps } from "@react-oauth/google";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { FirstSlider, SecondarySlider, ThirdSlider } from "@app/assets/img";
import Button from "@app/components/Button";
import { Google, LogoText } from "@app/assets/icon";
import { UserGoogle } from "@app/types/oauth.type";
import { useFetchWallet } from "@app/hooks";

import { CustomSlider, BackgroundImg, ImgSlider, TextSlider, ContainerSlider, TextLogo, LoginH1, Subtitle, ContainerLoginButton, CustomGrid, OrLineContainer } from "./login.css";
import { Alert, ClickAwayListener, Snackbar } from "@mui/material";

const Login = () => {
  const [messageSnackbar, setMessageSnackbar] = React.useState("");
  const { getInfoWallet, fetchMasterKey } = useFetchWallet();

  const { onClickAway, getRootProps } = useSnackbar({
    autoHideDuration: 8000,
    open: messageSnackbar ? true : false,
    onClose: () => {
      setMessageSnackbar("");
    },
  });

  const navigate = useNavigate();
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
  };

  const callbacksGoogle: GoogleLoginProps = {
    onSuccess: async credentialResponse => {
      const { data: profile } = await axios.get<UserGoogle>("https://www.googleapis.com/oauth2/v3/tokeninfo", { params: { id_token: credentialResponse.credential } });
      const { error: error1, info, networkKey } = await getInfoWallet("google", profile.email, credentialResponse.credential || "");
      if (error1) {
        setMessageSnackbar(error1);
        return;
      }
      const { error: error2, success, mfa } = await fetchMasterKey(info!, networkKey!);
      if (error2) {
        setMessageSnackbar(error2);
        return;
      }

      if (mfa) {
        navigate("multiple-factors");
        return;
      }
      if (success) {
        navigate("overview");
        return;
      }
    },
    onError: () => {
      console.log("Login Failed");
    },
  };

  return (
    <Grid container direction='row'>
      {messageSnackbar ? (
        <ClickAwayListener onClickAway={onClickAway}>
          <Snackbar {...getRootProps()} anchorOrigin={{ vertical: "top", horizontal: "right" }} open={messageSnackbar ? true : false}>
            <Alert severity='error' sx={{ width: "100%" }} variant='filled'>
              {messageSnackbar}
            </Alert>
          </Snackbar>
        </ClickAwayListener>
      ) : null}
      <Grid item xs={12} sm={12} md={6}>
        <TextLogo>
          <LogoText />
        </TextLogo>
        <LoginH1>Log in or sign up</LoginH1>
        <Subtitle>Select how you would like to continue</Subtitle>
        <ContainerLoginButton>
          <GoogleLogin {...callbacksGoogle} />
          <Button width='80%' height='48px' styleButton='default' fontSize='18px' iconLeft={Google} text='Continue with Google' />
          <OrLineContainer>
            <hr></hr>
            <p>or</p>
            <hr></hr>
          </OrLineContainer>
          <Button width='80%' height='48px' styleButton='default' fontSize='18px' text='See other options' />
        </ContainerLoginButton>
      </Grid>
      <CustomGrid item xs={12} sm={12} md={6}>
        <BackgroundImg>
          <CustomSlider {...settings}>
            <ContainerSlider>
              <ImgSlider src={FirstSlider}></ImgSlider>
              <TextSlider>Quick one-click login when logging in with Gmail and you can directly use the wallet immediately!</TextSlider>
            </ContainerSlider>
            <ContainerSlider>
              <ImgSlider src={SecondarySlider}></ImgSlider>
              <TextSlider>Quick one-click login when logging in with Gmail and you can directly use the wallet immediately!</TextSlider>
            </ContainerSlider>
            <ContainerSlider>
              <ImgSlider src={ThirdSlider}></ImgSlider>
              <TextSlider>Quick one-click login when logging in with Gmail and you can directly use the wallet immediately!</TextSlider>
            </ContainerSlider>
          </CustomSlider>
        </BackgroundImg>
      </CustomGrid>
    </Grid>
  );
};

export default Login;
