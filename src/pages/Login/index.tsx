import axios from "axios";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import { GoogleLogin, GoogleLoginProps } from "@react-oauth/google";
import { useSessionStorage } from "usehooks-ts";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { FirstSlider, SecondarySlider, ThirdSlider } from "@app/assets/img";
import Button from "@app/components/Button";
import { Google, LogoText } from "@app/assets/icon";
import { KeyPair } from "@app/wallet/node-service";
import { UserGoogle } from "@app/types/oauth.type";
import { useFetchWallet } from "@app/hooks";
import { InfoMasterKey } from "@app/wallet/metadata";

import { CustomSlider, BackgroundImg, ImgSlider, TextSlider, ContainerSlider, TextLogo, LoginH1, Subtitle, ContainerLoginButton, CustomGrid, OrLineContainer } from "./login.css";

const Login = () => {
  const { getInfoWallet } = useFetchWallet();
  const navigate = useNavigate();
  const [_, setMasterKey] = useSessionStorage<KeyPair>("master-key", { ethAddress: "", priKey: "", pubKey: "" });
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
      const { error, info } = await getInfoWallet("google", profile.email, credentialResponse.credential || "");
      if (error) {
        alert(error);
        return;
      }
    },
    onError: () => {
      console.log("Login Failed");
    },
  };

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
    </>
  );
};

export default Login;
