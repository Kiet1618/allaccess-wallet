import React from "react";
import ListItemButton from '@mui/material/ListItemButton';
import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ListSubheader from '@mui/material/ListSubheader';
import { listMenu } from "@app/configs/data";
import { subMenuItem } from '../../types/subMenuItem.type'
type Props = {
    name: string,
    subMenu: Array<subMenuItem>
}
const Slider: React.FC<Props> = (props: Props) => {
    const [open, setOpen] = React.useState(true);

    const handleClick = () => {
        setOpen(!open);
    };
    return (
        <ListItemButton onClick={handleClick}>

            <List>
                <ListItemButton component="div">
                    {props.name}
                </ListItemButton>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>

                        {props.subMenu.map(e =>
                            <ListItemButton sx={{ pl: 4 }}>
                                {e.name}
                            </ListItemButton>
                        )}


                    </List>
                </Collapse>
            </List>
        </ListItemButton>
    );
}

export default Slider;