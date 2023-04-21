import { GlobalStyles } from "./styles/global.css";
import { useState, useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./styles/themes.css"
import { Theme } from "./types/theme.type";
import Router from "./router";
import { redirect, useLocation } from "react-router-dom"
const App = () => {
  const [theme, setTheme] = useState('light');



  const themeToggler = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light')
  }


  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme as Theme : darkTheme as Theme}>
      <>
        <GlobalStyles />
        <Router />
        <div>
          <button onClick={themeToggler}>Switch Theme</button>
        </div>
      </>
    </ThemeProvider>
  );
}

export default App;
