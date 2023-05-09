import styled from "styled-components";
import { Container } from "@mui/material";
export const HeaderPageContainer = styled.div`
  margin: 44px 44px;
`;
export const ContentPageContainer = styled.div`
  margin: 44px 44px;
  height: 35vh;
  overflow: auto;
`;
export const SubHeaderPage = styled.div`
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  font-size: ${({ theme }) => theme.fontSizes.xs + "px"};
  line-height: 24px;
  margin-top: 20px;
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
  margin: 0 44px;
`;
export const SearchContainer = styled.div`
  display: flex;
  justify-content: right;
`;
export const TextHeaderOverview = styled.div`
  font-weight: ${({ theme }) => theme.fontWeights.semiBold};
  font-size: 20px;
  line-height: 30px;
  color: ${({ theme }) => theme.colors.neutrals.gray800};
`;
export const ListItemMyAssets = styled.div`
  margin: 10px 0;
`;
export const ItemMyAssets = styled.div`
  height: 44px;
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const ItemMyAssetsLeft = styled.div`
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
export const LinkImage = styled.a`
  margin-right: 10px;
  cursor: pointer;
`;
