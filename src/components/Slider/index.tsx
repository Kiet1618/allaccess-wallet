import { SliderApp, ListItemHeader } from "./slider.css";
// import { Menu, Item, MenuLink } from './slider.css'
import { listMenu } from "../../configs/data";
import List from "@mui/material/List";

import ListItem from "./listItem";
import { LogoIcon } from "../../assets/img";

const Slider = () => {
  return (
    <SliderApp>
      <List>
        <ListItemHeader>
          <img src={LogoIcon} />
          Allaccess.one
        </ListItemHeader>
        {listMenu.map(e => (
          <ListItem name={e.name} subMenu={e.subMenu} icon={e.icon} />
        ))}
      </List>
    </SliderApp>
  );
};

export default Slider;
