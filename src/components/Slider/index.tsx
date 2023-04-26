import React from "react";
import { SliderApp } from './slider.css'
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
const Slider = () => {
    const [open, setOpen] = React.useState(true);

    const handleClick = () => {
        setOpen(!open);
    };
    return (
        <SliderApp>
            <List>
                <ListSubheader component="div" id="nested-list-subheader">
                    ALL Ascce one
                </ListSubheader>
                {listMenu.map(e =>
                    <ListItem name={e.name} subMenu={e.subMenu} />
                )}

            </List>

        </SliderApp>

    );
}

export default Slider;