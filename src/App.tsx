import { GlobalStyles } from "./styles/global.css";
import React, { useState } from "react";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./styles/themes.css"
import { Theme } from "./types/theme.interface";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home, Login, Wallet, Profile } from './pages'
const App = () => {
  const [theme, setTheme] = useState('light');
  const themeToggler = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light')
  }
  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme as Theme : darkTheme as Theme}>
      <>
        <GlobalStyles />
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/wallet" element={<Wallet />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </Router>
        <button onClick={() => { }}></button>
        <div className="App">
          <button onClick={themeToggler}>Switch Theme</button>
        </div>
      </>
    </ThemeProvider>
  );
}

export default App;
