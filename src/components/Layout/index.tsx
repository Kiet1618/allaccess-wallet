import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styled, { ThemeProvider, ThemedStyledProps } from "styled-components";
import { lightTheme, darkTheme } from "../../styles/theme"
import { Theme } from "../../types/theme.type";
import { RoutesProps } from '../../types/route.type'
import { GlobalStyles } from '../../styles/global.css'
import { listMenu } from '../../configs/data';
import { Grid, Button } from '@mui/material';
import { Header, Footer } from '../'
import Slider from '../Slider'
import { SwapModeButton } from './layout.css'

const LayoutApp: React.FC<RoutesProps> = (props: React.PropsWithChildren<RoutesProps>,) => {

    const [theme, setTheme] = useState('light');
    const themeToggler = () => {
        theme === 'light' ? setTheme('dark') : setTheme('light')
    }
    const isLoggedIn = true;

    return (
        <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
            <GlobalStyles></GlobalStyles>
            {isLoggedIn ?

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
                : <>{props.children}</>}


        </ThemeProvider >
    );
};

export default LayoutApp;


