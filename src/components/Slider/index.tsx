import { ListItemHeader } from "./slider.css";
// import { Menu, Item, MenuLink } from './slider.css'
import { listMenu } from "../../configs/data";
import List from "@mui/material/List";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { createBreakpoint } from "styled-components-breakpoint";
import base from "../../styles/theme/base";
const breakpoint = createBreakpoint(base.breakpoints);
import ListItem from "./listItem";
import { LogoIcon } from "../../assets/img";

type Props = {
  display: boolean;
};
const Slider: React.FC<Props> = (props: Props) => {
  return (
    <SliderApp {...props}>
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
const SliderApp = styled.div<Props>`
  height: 100vh;
  position: static;
  background-color: ${props => props.theme.colors.neutrals.gray100};
  font-size: ${props => props.theme.fontSizes.sm} + "px";
  display: ${props => {
    if (props.display) {
      return "block";
    } else {
      return "none";
    }
  }};
  ${breakpoint("xs")<Props>`
      
    position: fixed;
    width: 70vw;
    right: 0;
    `};
  ${breakpoint("sm")<Props>`
      position: static;
      display: block;
      width: 26vw;
      left: 0;
    `};
  ${breakpoint("md")<Props>`
      position: static;
      display: block;
      width: 20vw;
      left: 0;
    `};

  ${breakpoint("lg")<Props>`
      position: static;
      display: block;
      width: 16vw;
      left: 0;
    `};

  border: solid 1px ${props => props.theme.colors.neutrals.gray400};
`;
