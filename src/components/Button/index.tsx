import React from "react";
import styled from "styled-components";
import base from "../../styles/theme/base";
import { createBreakpoint } from "styled-components-breakpoint";

const breakpoint = createBreakpoint(base.breakpoints);

type Props = {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  backgroundColor?: string;
  color?: string;
  width?: string;
  height?: string;
  borderRadius?: string;
  mLeft?: string;
  mTop?: string;
  mRight?: string;
  mBottom?: string;
  pLeft?: string;
  pTop?: string;
  pRight?: string;
  pBotton?: string;
  styleButton?: "primary" | "default" | "inactive" | "style";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

const ButtonComponent = styled.button<Props>`
  width: ${props => props.width};
  height: ${props => props.height + "px"};
  border-radius: ${props => props.theme.radii.sm + "px"};
  background-color: ${props => {
    if (props.styleButton === "primary") {
      return props.theme.colors.brands.blue500;
    } else if (props.styleButton === "default") {
      return props.theme.colors.white;
    } else if (props.styleButton === "inactive") {
      return "rgba(0, 0, 0, 0.1);";
    } else {
      return "#B9D7FF";
    }
  }};

  border: ${props => {
    if (props.styleButton === "primary") {
      return "none";
    } else if (props.styleButton === "default") {
      return `solid 1px ${props.theme.colors.neutrals.gray500}`;
    } else if (props.styleButton === "inactive") {
      return "none";
    } else {
      return "none";
    }
  }};
  color: ${props => {
    if (props.styleButton === "primary") {
      return "#FFF";
    } else if (props.styleButton === "default") {
      return props.theme.colors.neutrals.gray700;
    } else if (props.styleButton === "inactive") {
      return "#000";
    } else {
      return "blue";
    }
  }};

  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 48px;
  font-size: ${props => props.theme.fontSizes.sm + "px"};
  ${breakpoint("xs")`
      margin-left: auto;
      margin-right: auto;
      text-align: center;
    `}
  ${breakpoint("md")`
        text-align: left;
        margin-left: 0;
        margin-right: 0;
    `}
    cursor: pointer;
`;

const ButtonTemplate: React.FC<Props> = (props: Props) => {
  return <ButtonComponent {...props}>{props.children}</ButtonComponent>;
};

export default ButtonTemplate;
