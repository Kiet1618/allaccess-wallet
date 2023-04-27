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
  background-color: ${(props) => props.theme.colors.backgroundSecondary};
`

export const MenuLink = styled(NavLink)`
    text-decoration: none;
    color: ${(props) => props.theme.colors.textColorPrimary};
`
export const ListItemHeader = styled(ListItemButton)`
  margin-bottom: 40px;

  color: rgba(0, 0, 0, 0.8);
`
export const ImgLogoIcon = styled.img`
  margin-right: 10px;
`