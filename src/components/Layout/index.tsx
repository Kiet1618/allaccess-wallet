import React from "react";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "../../styles/theme";
import { RoutesProps } from "../../types/route.type";
import { GlobalStyles } from "../../styles/global.css";
import { Grid } from "@mui/material";
import { Header, Footer } from "../";
import Slider from "../Slider";
import { useState, useEffect } from "react";

const LayoutApp: React.FC<RoutesProps> = (props: React.PropsWithChildren<RoutesProps>) => {
  //const [theme, setTheme] = useState("light");
  // const themeToggler = () => {
  //     theme === "light" ? setTheme("dark") : setTheme("light");
  // }
  const [isMobile, setIsMobile] = useState(false);
  const handleResize = () => {
    if (window.innerWidth < 600) {
      setIsMobile(false);
    } else {
      setIsMobile(true);
    }
  };
  useEffect(() => {
    window.addEventListener("resize", handleResize);
  });
  const theme = "light";
  const isLoggedIn = true;
  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <GlobalStyles></GlobalStyles>
      {isLoggedIn ? (
        <Grid container columns={{ xs: 100, sm: 100, md: 100, lg: 100 }}>
          <Grid item xs={100} sm={26} md={20} lg={16}>
            <Slider display={isMobile} />
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
