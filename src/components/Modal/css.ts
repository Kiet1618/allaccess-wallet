import styled from "styled-components";
import { breakpoint } from "@app/utils";

export const ContainerDevice = styled.div`
  padding: 10px 10px;
  border-radius: 8px;
  border: 2px solid ${props => props.theme.colors.neutrals.gray200};
  margin: 20px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ContainerDeviceModal = styled.div`
  width: 100%;
`;
export const ListDevicesContainer = styled.div`
  ${breakpoint("xs")`
    margin-left: 10px;
`}
  ${breakpoint("lg")`
    margin-left: 44px;
  `}
`;

export const ContainerButtonFactors = styled.div`
  width: max-content;
  float: right;
`;

export const ContainerHeaderFactors = styled.div`
  display: flex;
  justify-content: space-between;
`;
export const ContainerNumberFactors = styled.div`
  padding: 12px 28px;
  gap: 10px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  background-color: #f0f0f1;
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

export const GroupLeftItemDevice = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ContainerText = styled.div`
  margin-left: 10px;
  text-align: left;
`;

export const NameText = styled.div`
  text-transform: capitalize;
  ${breakpoint("xs")`
        font-weight: 400;
        font-size: 13px;
    `}
  ${breakpoint("sm")`
        font-weight: 600;
        font-size: 16px;
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

export const IpText = styled.div`
  font-weight: 400;

  color: ${props => props.theme.colors.neutrals.gray500};
  ${breakpoint("xs")`
        font-size: 10px;
    `}
  ${breakpoint("sm")`
        font-size: 12px;
    `}
`;

export const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
`;
