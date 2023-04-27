import styled from "styled-components";
import { NavLink } from 'react-router-dom';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
export const SliderApp = styled.div`
  height: 100vh;
  background-color: ${(props) => props.theme.color.backgroundSecondary};
`
// export const Menu = styled(List)`
//   text-align: center;
// `
// export const Item = styled(ListItemButton)`
//   text-decoration: none;
//   list-style: none;
// `
// export const MenuLink = styled(NavLink)`
//   color: ${(props) => props.theme.text};
//   text-decoration: none;
//   width: 100%;
// `

export const MenuLink = styled(NavLink)`
    text-decoration: none;
    color: ${(props) => props.theme.text};
`