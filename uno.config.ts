// uno.config.ts
import { defineConfig } from "unocss";

export default defineConfig({
  theme: {
    breakpoints: {
      "2xl": "1536px",
      lg: "1024px",
      md: "768px",
      sm: "640px",
      xl: "1280px",
      xs: "480px",
    },
    colors: {
      bg: {
        primary: "hsl(227, 18 %, 8 %)",
        secondary: "hsl(227, 18 %, 12 %)",
      },
      btn: {
        grey: "#212530",
      },
      link: {
        icon: {
          bg: "#323748",
        },
        inactive: "#6f789b",
      },
      primary: "#7289da",
      secondary: "#b3aeff",
      white: "#fdfcff",
    },
    fontFamily: {
      discord: "Discord Font",
      inter: "Inter",
      nunito: "Nunito",
    },
  },
});
