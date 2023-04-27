import React from "react";
import { SliderApp, ListItemHeader, ImgLogoIcon } from './slider.css'
// import { Menu, Item, MenuLink } from './slider.css'
import { Grid, Button } from '@mui/material';
import { listMenu } from "../../configs/data";
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import { NavLink } from "react-router-dom";
import ListItem from "./listItem";
import { LogoIcon } from "../../assets/img";
const Slider = () => {

    return (
        <SliderApp>
            <List>
                <ListItemHeader>
                    <ImgLogoIcon src={LogoIcon} />
                    Allaccess.one
                </ListItemHeader>
                {listMenu.map(e =>
                    <ListItem name={e.name} subMenu={e.subMenu} icon={e.icon} />
                )}


            </List>

        </SliderApp>

    );
}

export default Slider;