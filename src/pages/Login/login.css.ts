import styled from 'styled-components'
import { Background } from '../../assets/img'
import Grid from '@mui/material/Grid';
import Slider from "react-slick";

export const BackgroundImg = styled.div`
    background-image: url('${Background}');
    height: 100vh;
    background-size: cover;
    background-repeat: no-repeat;
    text-align: ${(props) => props.theme.position.center};
`

export const ImgSlider = styled.img`
    margin-left:  ${(props) => props.theme.spacing.auto};
    margin-right: ${(props) => props.theme.spacing.auto};
`


export const TextSlider = styled.p`
    color: ${(props) => props.theme.baseColors.white};
    font-weight: ${(props) => props.theme.fontWeights.semiBold};
    font-size: ${(props) => props.theme.fontSizes.xl + 'px'};
    line-height: ${(props) => props.theme.lineHeights.lg + 'px'};
    width: 444px;
    margin-left:  ${(props) => props.theme.spacing.auto};
    margin-right: ${(props) => props.theme.spacing.auto};
    margin-top: ${(props) => props.theme.spacing.md + 'px'};
`
export const ContainerSlider = styled.div`
    text-align: ${(props) => props.theme.position.center};

`
export const TextLogo = styled.div`
    color: ${(props) => props.theme.baseColors.neutrals.gray800};
    display: flex;
    align-content: center;
    align-items: center;
    font-family: 'Roboto';
    font-weight: ${(props) => props.theme.fontWeights.bold};
    font-size: ${(props) => props.theme.fontSizes.lg + 'px'};
`
