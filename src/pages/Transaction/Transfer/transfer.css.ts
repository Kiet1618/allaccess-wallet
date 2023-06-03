import styled from "styled-components";
import { breakpoint } from "../../../utils";
import { MenuItem } from "@mui/material";

export const ContainerBalanceCard = styled.div`
  ${breakpoint("xs")`
     margin: 0 10px;
  `}
  ${breakpoint("md")`
     margin: 0 40px;
  `}
`;
export const TransferSuccessTitle = styled.div`
  font-weight: 600;
  font-size: 32px;
  line-height: 40px;
  color: rgba(0, 0, 0, 0.85);
`;

export const TransferSuccessSub = styled.div`
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #42526e;
  width: 418px;
  margin-top: 20px;
`;
export const CustomMenuItem = styled(MenuItem)`
  height: 50px;
  width: 100%;
  font-family: "Inter", sans-serif !important;
  font-style: normal !important;
  color: black !important;
`;

export const SearchContainer = styled.div`
  margin: 20px 10px;
`;

export const ReceiveTagHeader = styled.div`
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  font-size: 16px;
  line-height: 24px;
  color: ${({ theme }) => theme.colors.neutrals.gray600};
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

export const BackgroundPage = styled.div`
  background-color: #fafafa;
  padding: 40px;
  border-radius: 8px;
`;

export const SelectCoin = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  img {
    margin-right: 10px;
  }
`;

export const ContainerFlexSpace = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
`;

export const ContainerRight = styled.div`
  display: flex;
  justify-content: right;
  align-items: center;
  margin-top: 30px;
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

export const BalanceNumberCard = styled.div`
  font-weight: 600;
  font-size: 32px;
  line-height: 48px;
  margin: 20px 0;
`;
export const TitlePageContainer = styled.div`
  ${breakpoint("xs")`
    display: none;
`}
  ${breakpoint("lg")`
    display: block;
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

export const ContainerIconSuccess = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  align-items: center;
`;

export const ContainerTwoButtonModal = styled.div`
  margin-top: 50px;
  display: flex;
  justify-content: space-around;
  width: 100%;
  align-items: center;
`;

export const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 4,
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  textAlign: "center",
  alignItems: "center",
};
