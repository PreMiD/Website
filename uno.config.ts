// uno.config.ts
import { defineConfig } from "unocss";

export default defineConfig({
	theme: {
		colors: {
			bg: {
				primary: "hsl(227, 18 %, 8 %)",
				secondary: "hsl(227, 18 %, 12 %)"
			},
			btn: {
				green: "#62ad00"
			},
			link: {
				icon: {
					bg: "#323748"
				},
				inactive: "#6f789b"
			},
			primary: "#7289da",
			secondary: "#b3aeff",
			thirdinary: "#7e53db",
			white: "#fdfcff"
		},
		fontFamily: {
			discord: "Discord Font",
			nunito: "Nunito"
		}
	}
});
