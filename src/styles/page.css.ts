import styled from "styled-components";
import base from "./theme/base";
import { createBreakpoint } from "styled-components-breakpoint";
const breakpoint = createBreakpoint(base.breakpoints);

export const Page = styled.div`
  ${breakpoint("xs")`
    `}
  ${breakpoint("sm")`
        height: calc(100vh - 120px)
        overflow: hidden;

    `}
`;
export const TitlePage = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.xxxl + "px"};
  font-weight: ${({ theme }) => theme.fontWeights.semiBold};
  color: ${({ theme }) => theme.colors.brands.blue400};
  line-height: 39px;
`;
