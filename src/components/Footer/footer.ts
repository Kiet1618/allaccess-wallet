import styled from "styled-components";
import { createBreakpoint, createMap } from 'styled-components-breakpoint';
import base from '../../styles/theme/base';

const breakpoint = createBreakpoint(base.breakpoints);
const map = createMap(base.breakpoints);
export const FooterApp = styled.div`
    height: 5.45875vh;
    ${breakpoint('xs')`
    display: none;
    `}
     ${breakpoint('sm')`
    display: block;
    `}
`
