import { createGlobalStyle } from "styled-components"
import { Theme } from '@app/types/theme.type'
import styled from "styled-components";
import { createBreakpoint, createMap } from 'styled-components-breakpoint';
import base from '../styles/theme/base';

declare module "styled-components" {
  export interface DefaultTheme extends Theme { }
}
const breakpoint = createBreakpoint(base.breakpoints);
const map = createMap(base.breakpoints);

export const GlobalStyles = createGlobalStyle<{ theme: Theme }>`
  body {
    background: ${({ theme }) => theme.baseColors.neutrals.gray100};
    color: ${({ theme }) => theme.baseColors.neutrals.gray600};
    margin: 0;
    font-family: 'Inter';
    font-style: normal;
  }

`


export const Page = styled.div`
    border-bottom:  ${(props) => props.theme.colors.backgroundSecondary} solid 0.5vh;
    border-top: ${(props) => props.theme.colors.backgroundSecondary} solid 0.5vh;
    height: 87.28125vh;

    ${breakpoint('md')`
    font-size: 200px;
    `}
 
    ${breakpoint('xl')`
    font-size: 100px;
    `}
 
`