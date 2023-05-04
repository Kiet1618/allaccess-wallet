import { Theme, Colors } from "@app/types/theme.type";
import base from "./base";

const lightColors: Colors = {
    backgroundPrimary: '#FFF',
    backgroundSecondary: '#FAFBFC',
    textColorPrimary: '#000',
    textColorSecondary: '#42526E',
    primary: '#FFF',
    secondary: '#6B8096'
}
export const lightTheme: Theme = {
    ...base,
    colors: lightColors
}