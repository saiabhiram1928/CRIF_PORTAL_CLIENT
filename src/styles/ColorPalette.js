const ColorPalette = {
  white: "rgb(255,255,255)",
  black: "rgb(0,0,0)",

  violet: {
    primary: "rgb(15,23,42)",
    light: "rgb(30, 41, 59)",
    dark: "rgb(8,13,25)",
  },
  blue: {
    primary: "rgb(58, 122, 254)",
    transparent: "rgba(58, 122, 254, 0.2)",
  },
  green: {
    primary: "rgb(16, 202, 147)",
    transparent: "rgba(16, 202, 147, 0.2)",
  },
  grey: {
    primary: "rgb(100,100,100)",
    light: "rgb(241,245,249)",
    dark: "rgb(63,76,91)",
  },
  purple: {
    primary: "rgb(153, 102, 255)",
    transparent: "rgba(153, 102, 255, 0.2)",
  },
  red: {
    primary: "rgb(242, 87, 103)",
    transparent: "rgba(242, 87, 103, 0.2)",
  },
  yellow: {
    primary: "rgb(255, 159, 0)",
    transparent: "rgba(255, 159, 0, 0.2)",
  },
};

const primaryPalette = [
  "rgb(58, 122, 254)",
  "rgb(16, 202, 147)",
  "rgb(153, 102, 255)",
  "rgb(242, 87, 103)",
  "rgb(255, 159, 0)",
  "rgb(63,76,91)",
  "rgb(15,23,42)",
];
const secondaryPalette = [
  "rgba(58, 122, 254, 0.2)",
  "rgba(16, 202, 147, 0.2)",
  "rgba(153, 102, 255, 0.2)",
  "rgba(242, 87, 103, 0.2)",
  "rgba(255, 159, 0, 0.2)",
  "rgba(63,76,91, 0.2)",
  "rgba(15,23,42, 0.2)",
];

export {primaryPalette, secondaryPalette};
export default ColorPalette;
