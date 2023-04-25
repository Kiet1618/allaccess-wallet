import React, { useState } from 'react';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { NavLink } from 'react-router-dom';
import styled, { ThemeProvider, ThemedStyledProps } from "styled-components";
import { lightTheme, darkTheme } from "../../styles/themes.css"
import { Theme } from "../../types/theme.type";
import { RoutesProps } from '../../types/route.type'
import { GlobalStyles } from '../../styles/global.css'
import { listMenu } from '../../configs/data';
import { StyledButton } from './layout.css'
const { SubMenu, Item } = Menu;

const { Header, Content, Sider } = Layout;

const LayoutApp: React.FC<RoutesProps> = (props: React.PropsWithChildren<RoutesProps>,) => {

    const [theme, setTheme] = useState('light');
    const themeToggler = () => {
        theme === 'light' ? setTheme('dark') : setTheme('light')
    }
    const isLoggedIn = true;
    return (
        <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
            <GlobalStyles />
            {isLoggedIn ? <Layout style={{ minHeight: '100vh' }}>
                <Sider
                    collapsible
                >
                    <Menu
                        theme='dark'
                        defaultSelectedKeys={['/home']}
                        mode="inline"
                    >
                        {listMenu.map(e =>
                            <Item key={e.route}>
                                <NavLink to={e.route}>
                                    {e.name}
                                </NavLink>
                            </Item>
                        )}
                    </Menu>
                    <StyledButton onClick={themeToggler}>Switch Theme</StyledButton>

                </Sider>
                <Layout>
                    <Header></Header>
                    <Content>
                        {props.children}
                    </Content>
                </Layout>
            </Layout> : <div>{props.children}</div>}


        </ThemeProvider>
    );
};

export default LayoutApp;


