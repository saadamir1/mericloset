import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "dark",
};

const theme = extendTheme({
  config,
  colors: {
    light: {
      bg: "#ffffff",
      text: "#000000",
    },
    dark: {
      bg: "#121212",
      text: "#ffffff",
    },
    gray: {
      50: "#f9f9f9",
      100: "#ededed",
      200: "#d3d3d3",
      300: "#b3b3b3",
      400: "#a0a0a0",
      500: "#898989",
      600: "#6c6c6c",
      700: "#202020",
      800: "#121212",
      900: "#111111",
    },
  },
  styles: {
    global: (props: { colorMode: string }) => ({
      body: {
        bg: props.colorMode === "dark" ? "dark.bg" : "light.bg",
        color: props.colorMode === "dark" ? "dark.text" : "light.text",
      },
    }),
  },
});

export default theme;
