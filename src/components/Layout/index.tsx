import React from "react";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "../../styles/theme";
import { RoutesProps } from "../../types/route.type";
import { GlobalStyles } from "../../styles/global.css";
import { Grid } from "@mui/material";
import { Header, Footer } from "../";
import Slider from "../Slider";

const LayoutApp: React.FC<RoutesProps> = (props: React.PropsWithChildren<RoutesProps>) => {
  //const [theme, setTheme] = useState("light");
  // const themeToggler = () => {
  //     theme === "light" ? setTheme("dark") : setTheme("light");
  // }
  const theme = "light";
  const isLoggedIn = true;

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <GlobalStyles></GlobalStyles>
      {isLoggedIn ? (
        <Grid container columns={{ xs: 1, sm: 12, md: 12, lg: 12 }}>
          <Grid item xs={1} sm={3} md={2.5} lg={2}>
            <Slider />
          </Grid>
          <Grid item xs={1} sm={9} md={9.5} lg={10}>
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
