import { extendTheme } from "native-base";

export const theme = extendTheme({
  useSystemColorMode: false,
  initialColorMode: "dark",
  fontConfig: {
    Poppins: {
      100: {
        normal: "Poppins-regular",
      },
      200: {
        normal: "Poppins-regular",
      },
      300: {
        normal: "Poppins-regular",
      },
      400: {
        normal: "Poppins-regular",
      },
      500: {
        normal: "Poppins-regular",
      },
      600: {
        normal: "Poppins-regular",
      },
    },
  },

  fonts: {
    heading: "Poppins-Bold",
    body: "Poppins-regular",
    mono: "Poppins-regular",
  },
  colors: {
    gray: {
      200: "#F3F1E3",
    },
    blue: {
      300: "#004F9B",
      400: "#003466",
    },
    yellow: {
      300: "#E6B402",
    },
    green: {
      300: "#028336",
    },
    red: {
      400: "#9D0518",
    },
  },
});
