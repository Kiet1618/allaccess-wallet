import React from "react";
import styled from "styled-components";
import { breakpoint } from "../../utils";
import { Grid } from "@mui/material";

const Footer = () => {
  return (
    <FooterApp item xs={100} sm={74} md={80} lg={84}>
      <FooterContainer>© 2023 Allaccess wallet</FooterContainer>
      <FooterContainer>
        <a>About Us</a>
        <a>Contact Us</a>
      </FooterContainer>
    </FooterApp>
  );
};

export default Footer;

const FooterApp = styled(Grid)`
  height: 56px;
  z-index: 99;
  ${breakpoint("xs")`
        display: none;
    `}
  ${breakpoint("sm")`
        display: flex;
        width: 74vw;
    `}
   ${breakpoint("md")`
        width: 80vw;
    `}
  ${breakpoint("lg")`
        width: 84vw;
    `}
  border-top: solid 1px ${props => props.theme.colors.neutrals.gray200};
  font-size: ${props => props.theme.fontSizes.xxs + "px"};
  color: #42526e;
  line-height: 21px;
  justify-content: space-between;
  text-align: center;
  position: fixed;
  bottom: 0;
  right: 0;
  box-sizing: border-box;
  background-color: white;
`;
const FooterContainer = styled.div`
  display: inline-block;
  margin: 17.5px 44px;
  a {
    margin: 0 5px;
  }
`;
