import React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import List from "@mui/material/List";
import Collapse from "@mui/material/Collapse";
import { subMenuItem } from "../../types/subMenuItem.type";
import { ArrowRight, ArrowDown } from "../../assets/icon";
import { MenuLink, IconArrowMenu, ListItemDiv, NavLinkCustom } from "./slider.css";

type Props = {
  name: string;
  icon: React.FunctionComponent<React.SVGProps<SVGSVGElement> & { title?: string }>;
  subMenu: Array<subMenuItem>;
};

const Slider: React.FC<Props> = (props: Props) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(!open);
  };
  return (
    <List component='nav'>
      <ListItemButton component='div' onClick={handleClickOpen}>
        <props.icon style={{ marginRight: "10px" }}></props.icon>
        <ListItemDiv>{props.name}</ListItemDiv>
        <IconArrowMenu>{open ? <ArrowDown /> : <ArrowRight />}</IconArrowMenu>
      </ListItemButton>
      <Collapse in={open}>
        <NavLinkCustom>
          {props.subMenu.map(e => (
            <ListItemButton component={MenuLink} to={e.route}>
              {e.name}
            </ListItemButton>
          ))}
        </NavLinkCustom>
      </Collapse>
    </List>
  );
};

export default Slider;