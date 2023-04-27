import { Theme, Colors } from "@app/types/theme.type";
import base from "./base";

const darkColors: Colors = {
    primary: '#000',
    secondary: '#6B8096',
    textColorPrimary: '#42526E',
    textColorSecondary: '#42526E',
    backgroundPrimary: '#000',
    backgroundSecondary: '#111',
}
export const darkTheme: Theme = {
    ...base,
    colors: darkColors
}