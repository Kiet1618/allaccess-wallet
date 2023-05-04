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
  font-size: ${(props) => props.theme.fontSizes.sm} + 'px';

`

export const MenuLink = styled(NavLink)`
    text-decoration: none;
    font-weight:  ${(props) => props.theme.fontWeights.medium};
    font-size: ${(props) => props.theme.fontSizes.sm} + 'px';
    color: ${(props) => props.theme.baseColors.neutrals.gray600};
    display: block;
    width: 80%;
    height: 40px;
`

export const ListItemHeader = styled.div`
  font-family: 'Roboto';
  display: flex;
  align-content: center;
  align-items: center;
  font-style: normal;
  margin-left: 2vw;
  margin-top: 1vh;
  font-weight:  ${(props) => props.theme.fontWeights.medium};
  font-size: ${(props) => props.theme.fontSizes.lg} +'px';
  color: ${(props) => props.theme.baseColors.neutrals.gray800};
  gap: 8px;
  margin-bottom: 5vh;
`

export const IconArrowMenu = styled.div`
  right: 0;

`
export const ListItemDiv = styled.div`
  width: 80%;
  font-size: ${(props) => props.theme.fontSizes.sm} + 'px';

`
export const NavLinkCustom = styled(List)`
  a.active {
    color: ${(props) => props.theme.baseColors.brands.blue600};
    background-color: ${(props) => props.theme.baseColors.neutrals.gray300};
  
  }
  a {
    margin-left: auto;
    margin-right: auto;
  }
`