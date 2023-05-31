import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import styled from "styled-components";
import { breakpoint } from "../../utils";

export const BackgroundPage = styled.div`
  background-color: #fafafa;
  padding: 40px;
  border-radius: 8px;
`;
export const SubTitlePage = styled.div`
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  font-size: ${({ theme }) => theme.fontSizes.xs + "px"};
  line-height: 24px;

  color: ${({ theme }) => theme.colors.neutrals.gray600};
  ${breakpoint("xs")`
    width: 100%;
`}
  ${breakpoint("sm")`
     margin: 20px 0;
     width: 100%;
  `}
  ${breakpoint("md")`
     margin: 20px 0;
     width: 100%;
  `}
  ${breakpoint("lg")`
     margin: 20px 0;
     width: 60%;
  `}
`;
export const SelectCoin = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  img {
    margin-right: 10px;
  }
`;

export const CopyAddressContainer = styled.a`
  cursor: pointer;
  display: flex;
  justify-content: left;
  align-items: center;
  svg {
    margin-left: 5px;
    margin-right: 5px;
  }
`;
export const TitlePageContainer = styled.div`
  ${breakpoint("xs")`
    display: none;
`}
  ${breakpoint("lg")`
    display: block;
  `}
`;
export const TabsCustom = styled(Tabs)`
  background-color: #f6f6f6 !important;
  border-radius: 8px !important;
  .css-1aquho2-MuiTabs-indicator {
    background-color: #f6f6f6 !important;
  }
  .css-1h9z7r5-MuiButtonBase-root-MuiTab-root.Mui-selected {
    background-color: ${props => props.theme.colors.white} !important;
  }
  .css-1h9z7r5-MuiButtonBase-root-MuiTab-root {
    min-height: initial !important;
    height: 40px !important;
  }
  ${breakpoint("xs")`
    
      width: 100% ! important;
      display: flex;
      margin-left: 10px ! important;
      margin-right: 10px ! important;
    `}
  ${breakpoint("sm")`
      position: static;
      width: 300px ! important;
      justify-content: center;
      align-items: center;
      transform: none;
      margin: 10px 0;
      z-index: 0;
    `}
`;
export const TabTransfer = styled(Tab)`
  border-radius: 8px !important;
  margin: 5px !important;

  ${breakpoint("xs")`
      width: calc(50% - 10px) !important;
    `}
  ${breakpoint("sm")`
      width: 140px !important;
    `}
`;

export const NetworkContainerFixed = styled.div`
  background-color: ${props => props.theme.colors.white};
  ${breakpoint("xs")`
      margin-top: 24px;
      padding-top: 10px;
      padding-bottom: 10px;
    `}
  ${breakpoint("sm")`
        align-items: center;
        width: max-content;
        margin-left: 10px;
    `}
     ${breakpoint("md")`
        align-items: center;
        margin: auto
        width: max-content;
        margin-left: 44px;
      `}
       ${breakpoint("lg")`
        justify-content: center;
        align-items: center;
        margin-top: 44px;
        width: max-content;
        margin-right: 44px;
        float: right;
        `}
`;

export const SpanRed = styled.span`
  color: #cf2d2d;
`;
export const ContainerTextField = styled.div`
  margin: 10px 0;
  display: flex;
  flex-direction: column;
  justify-content: left;
`;
