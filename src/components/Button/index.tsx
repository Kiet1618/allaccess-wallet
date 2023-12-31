import React from "react";
import styled from "styled-components";
import { breakpoint } from "../../utils";
import { LoadingButton, LoadingButtonProps } from "@mui/lab";

type Props = {
  text?: string;
  iconLeft?: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string | undefined;
    }
  >;
  iconRight?: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string | undefined;
    }
  >;
  imgLeft?: string;
  imgRight?: string;
  border?: string;
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
  pBottom?: string;
  padding?: string;
  gap?: string;
  fontSize?: string;
  styleButton?: "primary" | "default" | "inactive" | "style";
  float?: string;
  justifyContent?: string;
  textAlign?: string;
  alignItems?: string;
};

const ButtonComponent = styled(LoadingButton)<LoadingButtonProps & Props>`
  margin-left: ${props => props.mLeft} !important;
  margin-right: ${props => props.mRight} !important;
  margin-top: ${props => props.mTop} !important;
  margin-bottom: ${props => props.mBottom} !important;
  float: ${props => props.float} !important;
  width: ${props => props.width} !important;
  height: ${props => props.height} !important;
  border-radius: ${props => props.theme.radii.sm + "px"} !important;
  background-color: ${props => {
    if (props.styleButton === "primary") {
      return props.theme.colors.brands.blue500;
    } else if (props.styleButton === "default") {
      return props.theme.colors.white;
    } else if (props.styleButton === "inactive") {
      return "#ECECED";
    } else {
      return "#EDF4FE";
    }
  }} !important;
  font-family: "Inter", sans-serif !important;
  font-style: normal !important;
  border: ${props => {
    if (props.styleButton === "primary") {
      return "none";
    } else if (props.styleButton === "default") {
      return `solid 1px ${props.theme.colors.neutrals.gray500}`;
    } else if (props.styleButton === "inactive") {
      return "none";
    } else {
      return `solid 1px ${props.theme.colors.brands.blue500}`;
    }
  }} !important;
  border: ${props => props.border} !important;

  color: ${props => {
    if (props.styleButton === "primary") {
      return "#FFF";
    } else if (props.styleButton === "default") {
      return props.theme.colors.neutrals.gray700;
    } else if (props.styleButton === "inactive") {
      return props.theme.colors.neutrals.gray600;
    } else {
      return props.theme.colors.brands.blue500;
    }
  }} !important;
  padding: ${props => props.padding} !important;
  gap: ${props => props.gap} !important;
  display: flex;

  line-height: ${props => props.height} !important;
  font-size: ${props => props.fontSize} !important;
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
  align-items: center;
  justify-content: ${props => (props.justifyContent ? props.justifyContent : "center")} !important;
  text-align: ${props => (props.textAlign ? props.textAlign : "center")} !important;
`;

const ButtonTemplate: React.FC<LoadingButtonProps & Props> = (props: LoadingButtonProps & Props) => {
  return (
    <ButtonComponent {...props}>
      {props.iconLeft ? <props.iconLeft></props.iconLeft> : null}
      {props.imgLeft ? <img src={props.imgLeft} width={"20px"} /> : null}
      <p style={{ margin: "0 10px", width: "90%" }}>{props.text}</p>
      {props.iconRight ? <props.iconRight style={{ float: "right" }}></props.iconRight> : null}
    </ButtonComponent>
  );
};

export default ButtonTemplate;
