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
  background-color: ${(props) => props.theme.baseColors.neutrals.gray100};
`

export const MenuLink = styled(NavLink)`
    text-decoration: none;
    font-weight:  ${(props) => props.theme.fontWeights.medium};
    color: ${(props) => props.theme.baseColors.neutrals.gray600};
    display: block;
    width: 100%;
`

export const ListItemHeader = styled.div`
  font-family: 'Roboto';
  display: flex;
  align-content: center;
  align-items: center;
  font-style: normal;
  font-weight:  ${(props) => props.theme.fontWeights.medium};
  font-size: ${(props) => props.theme.fontSizes.lg} +'px';
  color: ${(props) => props.theme.baseColors.neutrals.gray800};
  gap: 8px;
`

export const IconArrowMenu = styled.div`
  right: 0;

`
export const ListItemDiv = styled.div`
  width: 70%;
`