import styled from "styled-components";
import { breakpoint } from "../../../utils";

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
export const BackgroundPageQR = styled.div`
  background-color: white;
  border: 1px solid #fafafa;
  width: max-content;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 5px 5px 5px 5px rgba(88, 88, 88, 0.2);
`;
export const BackgroundPage = styled.div`
  background-color: #fafafa;
  padding: 40px;
  border-radius: 8px;
`;
export const ContainerFlexSpace = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
`;
export const AddressContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const ContainerQRCode = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;
export const ReceiveTagHeader = styled.div`
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  font-size: 16px;
  line-height: 24px;
  color: ${({ theme }) => theme.colors.neutrals.gray600};
`;
export const TitlePageContainer = styled.div`
  ${breakpoint("xs")`
    display: none;
`}
  ${breakpoint("lg")`
    display: block;
  `}
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
