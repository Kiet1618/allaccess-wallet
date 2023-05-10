import styled from "styled-components";
import { Container } from "@mui/material";
import base from "../../styles/theme/base";
import { createBreakpoint } from "styled-components-breakpoint";
const breakpoint = createBreakpoint(base.breakpoints);

export const HeaderPageContainer = styled.div`
  ${breakpoint("xs")`
      left: 50%;
      transform: translate(-50%, 0);
      position: fixed;
      background-color: white;
      width: calc(100vw - 20px);

    `}
  ${breakpoint("sm")`
      position: static;
      width: 100%;
      justify-content: center;
      align-items: center;
      transform: none;
      margin: auto
    `}
     ${breakpoint("md")`
        justify-content: center;
        align-items: center;
        margin-top: 44px;
        width: max-content;
        float: right;
        margin-right: 44px;
        `}
`;
export const TilePageContainer = styled.div`
  ${breakpoint("xs")`
    display: none;
`}
  ${breakpoint("sm")`
    display: block;
    margin: 0px 10px;
  `}
  ${breakpoint("md")`
    display: block;
    margin: 44px 44px;
  `}
    position: static;
  justify-content: center;
  align-items: center;
`;
export const ContentPageContainer = styled.div`
  height: 35vh;
  overflow: auto;
  ${breakpoint("xs")`
    margin: 44px 10px;
  `}
  ${breakpoint("md")`
    margin: 44px 44px;
  `}
`;
export const HaaderPageBalance = styled.div`
  ${breakpoint("xs")`
    margin: 60px 10px;
    `}
  ${breakpoint("md")`
    margin: 0 44px;
    `}
`;
export const SubHeaderPage = styled.div`
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  font-size: ${({ theme }) => theme.fontSizes.xs + "px"};
  line-height: 24px;
  color: ${({ theme }) => theme.colors.neutrals.gray600};
`;

export const BalanceContainer = styled.div`
  font-weight: ${({ theme }) => theme.fontWeights.semiBold};
  font-size: ${({ theme }) => theme.fontSizes.xl + "px"};
  display: flex;
  justify-content: left;
  align-items: center;
`;
export const TextBlue = styled.p`
  color: ${({ theme }) => theme.colors.brands.blue400};
  margin-right: 10px;
`;
export const Divider = styled.hr`
  background-color: ${({ theme }) => theme.colors.neutrals.gray400};
  border-width: 0;
  height: 1px;
  width: 100%;
`;
export const OverviewHeaderTopCoin = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${breakpoint("xs")`
    margin: 0px 10px;
    `}
  ${breakpoint("md")`
    margin: 0 44px;
    `}
`;
export const SearchContainer = styled.div`
  display: flex;
  justify-content: right;
`;
export const TextHeaderOverview = styled.div`
  font-weight: ${({ theme }) => theme.fontWeights.semiBold};
  font-size: 20px;
  line-height: 30px;
  /* width: 200px; */
  color: ${({ theme }) => theme.colors.neutrals.gray800};
`;
export const ListItemMyAssets = styled.div`
  margin: 10px 0;
`;
export const ItemMyAssets = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const ItemMyAssetsLeft = styled.div`
  height: 44px;
  display: flex;
  justify-content: left;
  align-items: center;
`;
export const TextCoin = styled.div`
  color: ${({ theme }) => theme.colors.neutrals.gray600};
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  margin-right: 20px;
`;
export const ItemMyAssetsRight = styled.div`
  display: flex;
  justify-content: right;
  align-items: center;
`;
export const FromToAddressContainer = styled.div`
  height: 25px;
`;

export const TransactionLinkContainer = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
`;

export const EmptyContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;