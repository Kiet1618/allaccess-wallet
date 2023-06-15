import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import { useGoogleLogin } from "@react-oauth/google";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { FirstSlider, SecondarySlider, ThirdSlider } from "@app/assets/img";
import Button from "@app/components/Button";
import { Google, LogoText } from "@app/assets/icon";
import { UserGoogle } from "@app/types/oauth.type";
import { useCustomSnackBar, useFetchWallet } from "@app/hooks";

import { CustomSlider, BackgroundImg, ImgSlider, TextSlider, ContainerSlider, TextLogo, LoginH1, Subtitle, ContainerLoginButton, CustomGrid, OrLineContainer } from "./login.css";
import { getGoogleToken } from "@app/wallet/metadata";

const Login = () => {
  const { handleNotification } = useCustomSnackBar();
  const { getInfoWallet, fetchMasterKey } = useFetchWallet();

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

  const login = useGoogleLogin({
    onSuccess: async tokenResponse => {
      const { data: tokens, error } = await getGoogleToken({ code: tokenResponse.code });
      if (error) {
        handleNotification(error, "error");
        return;
      }
      const { data: profile } = await axios.get<UserGoogle>("https://www.googleapis.com/oauth2/v3/tokeninfo", { params: { id_token: tokens?.id_token } });
      const { error: error1, info, networkKey } = await getInfoWallet("google", profile.email, tokens?.id_token || "");
      if (error1) {
        handleNotification(error1, "error");
        return;
      }
      const { error: error2, success, mfa } = await fetchMasterKey(info!, networkKey!);
      if (error2) {
        handleNotification(error2, "error");
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
    onError: error => {
      handleNotification(error?.error_description || "", "error");
    },
    flow: "auth-code",
  });

  return (
    <Grid container direction='row'>
      <Grid item xs={12} sm={12} md={6}>
        <TextLogo>
          <LogoText />
        </TextLogo>
        <LoginH1>Log in or sign up</LoginH1>
        <Subtitle>Select how you would like to continue</Subtitle>
        <ContainerLoginButton>
          <Button width='80%' height='48px' styleButton='default' fontSize='18px' iconLeft={Google} text='Continue with Google' onClick={() => login()} />
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
