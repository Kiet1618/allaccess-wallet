import Grid from "@mui/material/Grid";
import { LoginH1, Subtitle, ContainerLoginButton, OrLineContainer } from "./login.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Button from "../../components/Button";
import { Google, LogoText } from "../../assets/icon";
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import React from "react";
import { useSessionStorage } from "usehooks-ts";
import { KeyPair, getShareBSuccess } from "../../wallet/node-service";
const LoginDapp = () => {
  const navigate = useNavigate();
  const [_, setMasterKey] = useSessionStorage<KeyPair>("master-key", { ethAddress: "", priKey: "" });
  const cookies = new Cookies();
  const login = useGoogleLogin({
    onSuccess: async tokenResponse => {
      console.log(tokenResponse);
      const torusKey = await getShareBSuccess("", "", "");
      setMasterKey(torusKey);
      localStorage.setItem("torusKey", JSON.stringify(torusKey));
      cookies.set("torusKey", torusKey.ethAddress, { path: "/" });
      window.close();
    },
    flow: "auth-code",
  });

  return (
    <>
      <Grid container direction='row'>
        <Grid item xs={12} sm={12} md={6}>
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
      </Grid>
    </>
  );
};

export default LoginDapp;
