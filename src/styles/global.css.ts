import { createGlobalStyle } from "styled-components"
import { Theme } from '@app/types/theme.type'
import styled from "styled-components";


declare module "styled-components" {
  export interface DefaultTheme extends Theme { }
}

export const GlobalStyles = createGlobalStyle<{ theme: Theme }>`
  body {
    background: ${({ theme }) => theme.color.backgroundPrimary};
    color: ${({ theme }) => theme.text};
    font-family: Tahoma, Helvetica, Arial, Roboto, sans-serif;
    /* transition: all 0.50s linear; */
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
  }
`


export const Page = styled.div`
    /* background: ${(props) => props.theme.color.backgroundPrimary}; */
    border-bottom:  ${(props) => props.theme.color.backgroundSecondary} solid 0.5vh;
    border-top: ${(props) => props.theme.color.backgroundSecondary} solid 0.5vh;
    height: 87.28125vh
`