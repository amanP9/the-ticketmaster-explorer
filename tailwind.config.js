/** @type {import('tailwindcss').Config} */
export const content = ["./src/**/*.{js,jsx,ts,tsx}"];
export const theme = {
  extend: {
    gradientColorStops: {
      primary: "#e7d2f7",
      secondary: "#f2edf5",
    },
    backgroundImage: {
      gradient: "linear-gradient(to top, #25024d, #8800b8)",
    },
    colors: {
      yellow: {
        100: "#ffffcc",
        200: "#fffe99",
        300: "#fffd66",
        400: "#fffc33",
        500: "#fffb00",
        600: "#ccbf00",
        700: "#998e00",
        800: "#665d00",
        900: "#332c00",
      },
      lightpurple: {
        100: "#f5f3f7",
        200: "#eae6f0",
        300: "#dcd0e9",
        400: "#c9addb",
        500: "#b286cc",
        600: "#9866b1",
        700: "#73458c",
        800: "#512f6c",
        900: "#301c4b",
      },
    },
  },
};
export const variants = {
  extend: {},
};
export const plugins = [require("tailwind-scrollbar-hide")];
