import React from "react";
import Grid from '@mui/material/Grid';
import { BackgroundImg, ImgSlider, TextSlider, ContainerSlider, TextLogo } from './login.css'
import { FristSlider, LogoIconXL } from '../../assets/img'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";


const Login = () => {

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        // autoplay: true,
        // autoplaySpeed: 2000,
        arrows: false,
    };

    return (

        <>
            <Grid container
                direction="row"
                justifyContent="center"
                textAlign="center">
                <Grid item xs={6}>
                    <TextLogo>
                        <img src={LogoIconXL} />
                        Allaccess . one
                    </TextLogo>
                </Grid>
                <Grid item xs={6}
                >
                    <BackgroundImg>
                        <Slider {...settings}>
                            <ContainerSlider>
                                <ImgSlider src={FristSlider}></ImgSlider>
                                <TextSlider>
                                    Quick one-click login when logging in with Gmail and you can directly use the wallet immediately!
                                </TextSlider>
                            </ContainerSlider>
                            <ContainerSlider>
                                <ImgSlider src={FristSlider}></ImgSlider>
                                <TextSlider>
                                    Quick one-click login when logging in with Gmail and you can directly use the wallet immediately!
                                </TextSlider>
                            </ContainerSlider>
                            <ContainerSlider>
                                <ImgSlider src={FristSlider}></ImgSlider>
                                <TextSlider>
                                    Quick one-click login when logging in with Gmail and you can directly use the wallet immediately!
                                </TextSlider>
                            </ContainerSlider>
                        </Slider>

                    </BackgroundImg>
                </Grid >

            </Grid >
        </>
    );
}

export default Login;