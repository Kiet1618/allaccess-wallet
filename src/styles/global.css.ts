import { createGlobalStyle } from "styled-components"
import { Theme } from '@app/types/theme.type'
import styled from "styled-components";


declare module "styled-components" {
  export interface DefaultTheme extends Theme { }
}

export const GlobalStyles = createGlobalStyle<{ theme: Theme }>`
  body {
    background: ${({ theme }) => theme.colors.backgroundPrimary};
    color: ${({ theme }) => theme.colors.textColorPrimary};
    margin: 0;
    font-family: 'Inter';
    font-style: normal;

  }

`


export const Page = styled.div`
    border-bottom:  ${(props) => props.theme.colors.backgroundSecondary} solid 0.5vh;
    border-top: ${(props) => props.theme.colors.backgroundSecondary} solid 0.5vh;
    height: 87.28125vh
`