import { extendTheme, ThemeConfig, StyleFunctionProps } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  fonts: {
    heading: `'Fraunces', 'Georgia', serif`,
    body: `'DM Sans', system-ui, sans-serif`,
  },
  colors: {
    brand: {
      50: "#e8f7f4",
      100: "#c5ebe3",
      200: "#9dd9cc",
      300: "#6fc4b2",
      400: "#3eaa95",
      500: "#0d9488",
      600: "#0b7a70",
      700: "#095f57",
      800: "#064540",
      900: "#042e2b",
    },
    ink: {
      50: "#f4f5f7",
      100: "#e4e7ec",
      700: "#2a3140",
      800: "#1a1f2a",
      900: "#0e1218",
    },
    gray: {
      50: "#f7f7f8",
      100: "#eeeef0",
      200: "#d8d9de",
      300: "#b5b7c0",
      400: "#8e919d",
      500: "#6b6f7b",
      600: "#52565f",
      700: "#3c3f47",
      800: "#262930",
      900: "#16181d",
    },
  },
  styles: {
    global: (props: StyleFunctionProps) => ({
      "html, body": {
        bg: props.colorMode === "dark" ? "ink.900" : "#f6f4f1",
        color: props.colorMode === "dark" ? "gray.100" : "ink.800",
      },
      a: { color: "brand.600" },
    }),
  },
  components: {
    Button: {
      defaultProps: { colorScheme: "brand" },
      baseStyle: { borderRadius: "full", fontWeight: 600 },
    },
    Heading: {
      baseStyle: { letterSpacing: "-0.02em" },
    },
  },
});

export default theme;
