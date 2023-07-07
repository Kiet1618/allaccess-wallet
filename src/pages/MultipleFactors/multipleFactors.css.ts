import styled from "styled-components";
import { breakpoint } from "../../utils";

export const ContainerButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 40px 0 10px 0;
`;

export const ContainerMultipleFactors = styled.div`
  text-align: center;
  align-items: center;
  margin-top: 5vh;
`;
export const HeaderText = styled.div`
  font-weight: 600;
  font-size: 32px;
  line-height: 40px;
  color: ${props => props.theme.colors.neutrals.gray1000};
`;
export const SubHeaderText = styled.div`
  margin-top: 20px;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: ${props => props.theme.colors.neutrals.gray600};
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
export const IdText = styled.div`
  ${breakpoint("xs")`
        font-weight: 400;
        font-size: 13px;
    `}
  ${breakpoint("sm")`
        font-weight: 400;
        font-size: 16px;
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
export const TextHeaderCard = styled.div`
  color: ${props => props.theme.colors.neutrals.gray800};
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
`;
export const TextSummary = styled.p`
  font-size: ${props => props.theme.fontSizes.md};
`;
export const ContainerBackgroundCard = styled.div`
  border-radius: 8px;
  padding: 32px;
  text-align: left;
  border: 2px solid ${props => props.theme.colors.neutrals.gray200};
  ${breakpoint("xs")`
        margin-left: auto;
        margin-right: auto;
        width: 80%;
    `}
  ${breakpoint("sm")`
        width: 60%;
    `}
     ${breakpoint("md")`
        width: 50%;
    `}
     ${breakpoint("lg")`
        width: 35%;
    `}
    margin-top: 5vh;
`;
export const ContainerDevice = styled.div`
  padding: 10px 10px;
  border-radius: 8px;
  border: 2px solid ${props => props.theme.colors.neutrals.gray200};
  margin: 20px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const ContainerText = styled.div`
  margin-left: 10px;
  text-align: left;
`;
export const GroupLeftItemDevice = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
