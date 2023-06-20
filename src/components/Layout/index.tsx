import React, { useState, useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { Grid } from "@mui/material";
import { lightTheme, darkTheme, GlobalStyles } from "@app/styles";
import { RoutesProps } from "@app/types/route.type";

import { routes } from "@app/configs/data";
import { useCustomSnackBar, useFetchWallet, usePushNotifications } from "@app/hooks";
import { MessagePayload } from "@firebase/messaging";
import { ShareInfo } from "@app/wallet/metadata";

import { Header, Footer, Sidebar, DeviceModal } from "../";
import { isEmpty } from "lodash";

const LayoutApp: React.FC<RoutesProps> = (props: React.PropsWithChildren<RoutesProps>) => {
  //const [theme, setTheme] = useState("light");
  // const themeToggler = () => {
  //     theme === "light" ? setTheme("dark") : setTheme("light");
  // }
  const location = useLocation();
  const { updateShareForPublicKey } = useFetchWallet();
  const { handleNotification } = useCustomSnackBar();
  const checkLayout = routes.find(route => route.path === location.pathname);
  const [isDesktop, setIsDesktop] = useState(false);
  const [detectDevice, setDetectDevice] = useState<ShareInfo | null>(null);
  const handleResize = () => {
    if (window.innerWidth < 600) {
      setIsDesktop(false);
    } else {
      setIsDesktop(true);
    }
  };
  useLayoutEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const theme = "light";

  const handleDetectDevice = (message: MessagePayload) => {
    if (!message) return;

    if (message.notification?.title === "confirm-device") {
      // Display modal
      const share = JSON.parse(message?.notification?.body || "{}") as ShareInfo;
      setDetectDevice(share);
    }
    return;
  };

  usePushNotifications(handleDetectDevice);
  const handleConfirmDevice = async () => {
    if (isEmpty(detectDevice)) return;
    const { error } = await updateShareForPublicKey(detectDevice);
    if (error) {
      handleNotification(error, "error");
      return;
    }
    handleNotification("Confirm successfully", "success");
    setDetectDevice(null);
  };

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <GlobalStyles></GlobalStyles>
      <DeviceModal
        title='Confirm device'
        subTitle='Please confirm new device if you logged!'
        loading={false}
        device={detectDevice}
        isCurrent={false}
        handleClose={() => setDetectDevice(null)}
        handleConfirm={handleConfirmDevice}
      />
      {checkLayout?.layout ? (
        <Grid container columns={{ xs: 100, sm: 100, md: 100, lg: 100 }}>
          <Grid item xs={100} sm={26} md={20} lg={16}>
            <Sidebar display={isDesktop} />
          </Grid>
          <Grid item xs={100} sm={74} md={80} lg={84}>
            <Header />
            {props.children}
            <Footer />
          </Grid>
        </Grid>
      ) : (
        <div>{props.children}</div>
      )}
    </ThemeProvider>
  );
};

export default LayoutApp;
