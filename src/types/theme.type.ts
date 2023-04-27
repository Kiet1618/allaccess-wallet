export type Theme = {
    radii: Radii;
    fontWeights: FontWeights;
    lineHeights: LineHeights;
    fontSizes: FontSizes;
    colors: Colors;
}
export type FontSizes = {
    xs: number;
    s: number,
    m: number,
    l: number,
    xl: number,
}
export type Colors = {
    backgroundPrimary: string,
    backgroundSecondary: string,
    textColorPrimary: string,
    textColorSecondary: string,
    primary: string,
    secondary: string,
}
export type FontWeights = {
    fontWeight1: string;
    fontWeight2: string;
}
export type Radii = {
    radius0: string;
    radius10: string;
}
export type LineHeights = {
    lineHeight1: string;
}