import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import { useGoogleLogin } from "@react-oauth/google";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Cookies from "universal-cookie";
import { FirstSlider, SecondarySlider, ThirdSlider } from "@app/assets/img";
import Button from "@app/components/Button";
import { Google, LogoText } from "@app/assets/icon";
import { UserGoogle } from "@app/types/oauth.type";
import { useCustomSnackBar, useFetchWallet, usePushNotifications } from "@app/hooks";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "@app/store";
import { setProfile } from "@app/store/redux/profile/actions";
import { CustomSlider, BackgroundImg, ImgSlider, TextSlider, ContainerSlider, TextLogo, LoginH1, Subtitle, ContainerLoginButton, CustomGrid, OrLineContainer } from "./login.css";
import { getGoogleToken } from "@app/wallet/metadata";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
type ChainId = {
  chainId: string;
};
const Login = () => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const { token } = usePushNotifications();
  const { handleNotification } = useCustomSnackBar();
  const { getInfoWallet, fetchMasterKey, insertTokenFCM } = useFetchWallet();
  const cookies = new Cookies();
  const navigate = useNavigate();
  // const [_, setMasterKey] = useSessionStorage<KeyPair>("master-key", { ethAddress: "", priKey: "" });
  const { chainId } = useParams();
  const ChainIdParams: ChainId = chainId ? JSON.parse(chainId as string) : null;
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
      handleOpen();

      const { data: tokens, error } = await getGoogleToken({ code: tokenResponse.code });
      if (error) {
        handleNotification(error, "error");
        handleClose();
        return;
      }
      const { data: profile } = await axios.get<UserGoogle>("https://www.googleapis.com/oauth2/v3/tokeninfo", { params: { id_token: tokens?.id_token } });
      console.log(profile);
      dispatch(
        setProfile({
          userName: profile.name,
          email: profile.email,
          avatar: profile.picture,
        })
      );
      const { error: error1, info, networkKey } = await getInfoWallet("google", profile.email, tokens?.id_token || "");
      if (error1) {
        handleNotification(error1, "error");
        handleClose();
        return;
      }
      const { error: error2, success, mfa } = await fetchMasterKey(info!, networkKey!);
      if (error2) {
        handleNotification(error2, "error");
        handleClose();
        return;
      }

      if (mfa) {
        handleClose();
        ChainIdParams ? cookies.set("chainId", ChainIdParams.chainId, { path: "/" }) : null;
        navigate("/multiple-factors");
        return;
      }
      if (success) {
        insertTokenFCM(token, info!);
        ChainIdParams ? cookies.set("chainId", ChainIdParams.chainId, { path: "/" }) : null;
        // ChainIdParams ? window.close() : null;
        handleClose();
        navigate("overview");
        return;
      }
      handleClose();
    },
    onError: error => {
      handleNotification(error?.error_description || "", "error");
      // localStorage.setItem("torusKey", JSON.stringify(torusKey));
      // cookies.set("torusKey", torusKey.ethAddress, { path: "/" });
      // navigate("/overview");
      window.close();
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
      <Backdrop sx={{ color: "#fff", zIndex: theme => theme.zIndex.drawer + 1 }} open={open}>
        <CircularProgress color='inherit' />
      </Backdrop>
    </Grid>
  );
};

export default Login;
