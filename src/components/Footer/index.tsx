import React from "react";
import styled from "styled-components";
import { createBreakpoint } from "styled-components-breakpoint";
import base from "../../styles/theme/base";
const breakpoint = createBreakpoint(base.breakpoints);
import { Grid } from "@mui/material";

const FooterApp = styled(Grid)`
  height: 56px;

  ${breakpoint("xs")`
        display: none;
    `}
  ${breakpoint("sm")`
        display: flex;
    `}
    border: solid 1px ${props => props.theme.colors.neutrals.gray200};
  font-size: ${props => props.theme.fontSizes.xs + "px"};
  color: #42526e;
  line-height: 21px;
  justify-content: space-between;
  text-align: center;
  position: fixed;
  bottom: 0;
  right: 0;
  width: 100%;
`;
const FooterContainer = styled.div`
  display: inline-block;
  margin: 17.5px 44px;
`;
const Footer = () => {
  return (
    <FooterApp item xs={1} sm={9} md={9.5} lg={10}>
      <FooterContainer>© 2023 Allaccess wallet</FooterContainer>
      <FooterContainer>
        <a>About Us</a>
        <a>Contact Us</a>
      </FooterContainer>
    </FooterApp>
  );
};

export default Footer;
