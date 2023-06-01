import { NavLink } from "react-router-dom";
import List from "@mui/material/List";
import styled from "styled-components";
import { breakpoint } from "../../utils";
import { Props } from "./";
export const SidebarApp = styled.div<Props>`
  min-height: 100%;
  background-color: ${props => props.theme.colors.neutrals.gray100};
  font-size: ${props => props.theme.fontSizes.md} + "px";
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
    border: none;
    height: 100vh;
    `};
  ${breakpoint("sm")<Props>`
      position: static;
      display: block;
      width: 100%;
      left: 0;
      border-right: solid 1px ${props => props.theme.colors.neutrals.gray400};

    `};
  ${breakpoint("md")<Props>`
      position: static;
      display: block;
      left: 0;
    `};

  ${breakpoint("lg")<Props>`
      position: static;
      display: block;
      left: 0;
    `};

  box-sizing: border-box;
`;

export const MenuLink = styled(NavLink)`
  text-decoration: none;
  font-weight: ${props => props.theme.fontWeights.medium};
  font-size: ${props => props.theme.fontSizes.xs} + "px";
  color: ${props => props.theme.colors.neutrals.gray600};
  display: block;
  width: 80%;
  height: 40px;
`;

export const ListItemHeader = styled.div`
  font-family: "Roboto", sans-serif;
  display: flex;
  position: fixed;
  align-content: center;
  align-items: center;
  font-style: normal;
  margin-left: 2vw;
  margin-top: 1vh;
  font-weight: ${props => props.theme.fontWeights.medium};
  font-size: ${props => props.theme.fontSizes.md} + "px";
  color: ${props => props.theme.colors.neutrals.gray800};
  gap: 8px;
  margin-bottom: 5vh;
`;

export const IconArrowMenu = styled.div`
  right: 0;
`;
export const ListItemDiv = styled.div`
  width: 80%;
  font-size: ${props => props.theme.fontSizes.xs} + "px";
  color: #42526e;
  font-weight: ${props => props.theme.fontWeights.medium};
`;
export const NavLinkCustom = styled(List)`
  a.active {
    color: ${props => props.theme.colors.brands.blue600};
    background-color: ${props => props.theme.colors.neutrals.gray300};
    border-radius: 3px !important;
  }
  a {
    margin-left: auto;
    margin-right: auto;
  }
`;
export const ListCustom = styled.div`
  position: fixed;
  margin-top: 100px;
  ${breakpoint("xs")`
        width: 70vw;
    `}
  ${breakpoint("sm")`
        max-width: 26%;
    `}
   ${breakpoint("md")`
        max-width: 20%;
    `}
  ${breakpoint("lg")`
        max-width: 16%;
    `}
`;
