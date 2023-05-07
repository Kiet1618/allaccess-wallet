import React from "react";
import styled from "styled-components";
import { createBreakpoint } from "styled-components-breakpoint";
import base from "../../styles/theme/base";
const breakpoint = createBreakpoint(base.breakpoints);
import { useLocation } from "react-router-dom";
import { routes } from "../../configs/data";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Slider from "../Slider";
import { Menu } from "../../assets/icon";
const HeaderApp = styled.div`
  ${breakpoint("xs")`
        border: none;
        height: 80px;
    `}
  ${breakpoint("sm")`
        border: solid 1px ${props => props.theme.colors.neutrals.gray200};
        height: 64px;

    `}
    display: flex;
  justify-content: space-between;
  text-align: center;
  width: 100%;
`;
const TextBreadcumb = styled.div`
  ${breakpoint("xs")`
        color: ${props => props.theme.colors.neutrals.gray900};
        font-weight: ${props => props.theme.fontWeights.semiBold};
        font-size: ${props => props.theme.fontSizes.xl + "px"};
        margin: 17px 44px;
    `}
  ${breakpoint("sm")`
        color: ${props => props.theme.colors.neutrals.gray600};
        font-weight: ${props => props.theme.fontWeights.semiBold};
        font-size: ${props => props.theme.fontSizes.lg + "px"};
        margin: 17px 44px;
    `}
`;
const ButtonCustom = styled.div`
  ${breakpoint("xs")`
        display: block;
        margin: 17px 44px;
    `}
  ${breakpoint("sm")`
        display: none;
    `}
`;

const Header = () => {
  const location = useLocation();
  const breadcumbs = routes.find(route => route.path === location.pathname);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <HeaderApp>
      <TextBreadcumb>{breadcumbs?.breadcrumbName}</TextBreadcumb>
      <ButtonCustom>
        <Button onClick={handleOpen}>
          <Menu />
        </Button>
      </ButtonCustom>
      <Modal open={open} onClose={handleClose} aria-labelledby='modal-modal-title' aria-describedby='modal-modal-description'>
        <Slider display={open} />
      </Modal>
    </HeaderApp>
  );
};

export default Header;
