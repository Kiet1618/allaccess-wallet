import { GlobalStyles } from "./styles/global.css";
import React, { useState, useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./styles/themes.css"
import { Theme } from "./types/theme.interface";
function App() {
  const [theme, setTheme] = useState('light');
  const themeToggler = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light')
  }
  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme as Theme : darkTheme as Theme}>
      <>
        <GlobalStyles />
        <div className="App">
          <button onClick={themeToggler}>Switch Theme</button>
        </div>
      </>
    </ThemeProvider>
  );
}

export default App;
