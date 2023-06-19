import Grid from "@mui/material/Grid";
import { CustomSlider, BackgroundImg, ImgSlider, TextSlider, ContainerSlider, TextLogo, LoginH1, Subtitle, ContainerLoginButton, CustomGrid, OrLineContainer } from "./login.css";
import { FirstSlider, SecondarySlider, ThirdSlider } from "../../assets/img";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Button from "../../components/Button";
import { Google, LogoText } from "../../assets/icon";
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import React from "react";
import Cookies from "universal-cookie";
// import axios from "axios";
// import { useSessionStorage } from "usehooks-ts";
import { getShareBSuccess } from "../../wallet/node-service";
const Login = () => {
  const cookies = new Cookies();
  const navigate = useNavigate();
  // const [_, setMasterKey] = useSessionStorage<KeyPair>("master-key", { ethAddress: "", priKey: "" });
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
      console.log(tokenResponse);
      const torusKey = await getShareBSuccess("", "", "");
      // setMasterKey(torusKey);
      localStorage.setItem("torusKey", JSON.stringify(torusKey));
      cookies.set("torusKey", torusKey.ethAddress, { path: "/" });
      navigate("/overview");
      window.close();
    },
    flow: "auth-code",
  });

  return (
    <>
      <Grid container direction='row'>
        <Grid item xs={12} sm={12} md={6}>
          <TextLogo>
            <LogoText />
          </TextLogo>
          <LoginH1>Log in or sign up</LoginH1>
          <Subtitle>Select how you would like to continue</Subtitle>
          <ContainerLoginButton>
            <Button onClick={() => login()} width='80%' height='48px' styleButton='default' fontSize='18px' iconLeft={Google} text='Continue with Google' />
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
    </>
  );
};

export default Login;
