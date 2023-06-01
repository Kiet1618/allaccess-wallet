import styled from "styled-components";
import { breakpoint } from "../../../utils";

export const ContainerAvatar = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const ContainerInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  ${breakpoint("xs")`
    margin-left: 0;
`}
  ${breakpoint("md")`
    margin-left: 50px;
  `}
`;
