import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import List from "@mui/material/List";
import Collapse from "@mui/material/Collapse";
import ListItemButton from "@mui/material/ListItemButton";
import { subMenuItem } from "../../types/subMenuItem.type";
import { ArrowRight, ArrowDown } from "../../assets/icon";
import { MenuLink, IconArrowMenu, ListItemDiv, NavLinkCustom } from "./sidebar.css";
import { useSessionStorage } from "usehooks-ts";
import { KeyPair } from "@app/wallet/types";
import { InfoMasterKey } from "@app/wallet/metadata";

type Props = {
  name: string;
  icon: React.FunctionComponent<React.SVGProps<SVGSVGElement> & { title?: string }>;
  subMenu: Array<subMenuItem>;
};

const Slider: React.FC<Props> = (props: Props) => {
  const [_, setMasterKey] = useSessionStorage<KeyPair | null>("master-key", null);
  const [__, setInfoMasterKey] = useSessionStorage<InfoMasterKey | null>("info-master-key", null);
  const location = useLocation();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(!open);
  };
  const handleClickTrue = () => {
    const temp = props.subMenu.find(e => e.route === location.pathname);
    setOpen(temp ? true : false);
  };
  useEffect(handleClickTrue, []);

  const renderSubMenu = () => {
    return props.subMenu.map(e => {
      return (
        <ListItemButton
          key={e.name}
          component={(props: any) => {
            return (
              <MenuLink
                {...props}
                onClick={() => {
                  if (e.key === "logout") {
                    setMasterKey(null);
                    setInfoMasterKey(null);
                  }
                }}
              />
            );
          }}
          to={e.route}
        >
          {e.name}
        </ListItemButton>
      );
    });
  };

  return (
    <List component='nav'>
      <ListItemButton component='div' onClick={handleClickOpen}>
        <props.icon style={{ marginRight: "10px" }}></props.icon>
        <ListItemDiv>{props.name}</ListItemDiv>
        <IconArrowMenu>{open ? <ArrowDown /> : <ArrowRight />}</IconArrowMenu>
      </ListItemButton>
      <Collapse in={open}>
        <NavLinkCustom>{renderSubMenu()}</NavLinkCustom>
      </Collapse>
    </List>
  );
};

export default Slider;
