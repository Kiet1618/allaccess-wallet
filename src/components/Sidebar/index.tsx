import React from "react";
import List from "@mui/material/List";
import ListItem from "./listItem";
import { listMenu } from "../../configs/data";
import { LogoNew } from "../../assets/img";
import { SidebarApp } from "./sidebar.css";
import { ListItemHeader, ListCustom } from "./sidebar.css";

export type Props = {
  display: boolean;
};

const Sidebar: React.FC<Props> = (props: Props) => {
  return (
    <SidebarApp {...props}>
      <List>
        <ListItemHeader>
          <img src={LogoNew} width={50} />
          Allaccess.one
        </ListItemHeader>
        <ListCustom>
          {listMenu.map(e => (
            <ListItem key={e.name} name={e.name} subMenu={e.subMenu} icon={e.icon} />
          ))}
        </ListCustom>
      </List>
    </SidebarApp>
  );
};

export default Sidebar;
