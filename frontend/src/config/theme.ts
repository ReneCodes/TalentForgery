import {createTheme} from '@mui/material';
import {yellow, grey, indigo, red, green} from '@mui/material/colors';

declare module '@mui/material/styles' {
	interface Theme {
		palette: {
			primary: {
				main: string;
				600: string;
				800: string;
			};
			secondary: {
				100: string;
				main: string;
				900: string;
			};
			gray: {
				main: string;
				300: string;
				700: string;
				900: string;
			};
			white: {
				main: string;
			};
			red: {
				main: string;
				900: string;
			};
			green: {
				main: string;
				800: string;
				900: string;
			};
		};
	}

	interface PaletteOptions {
		gray: PaletteOptions['primary'];
		white: PaletteOptions['primary'];
		red: PaletteOptions['primary'];
		green: PaletteOptions['primary'];
	}

	// allow configuration using `createTheme`
	interface ThemeOptions {
		status?: {
			danger?: string;
		};
	}
}

let theme = createTheme({
	palette: {
		primary: {
			800: indigo[800],
			600: indigo[600],
			main: indigo[500],
		},
		secondary: {
			100: yellow[100],
			main: yellow[800],
			900: yellow[900],
		},
		gray: {
			main: grey[500],
			300: grey[300],
			700: grey[700],
			900: grey[900],
		},
		white: {
			main: grey[50],
		},
		red: {
			main: red[800],
			900: red[900],
		},
		green: {
			main: green[500],
			800: green[800],
			900: green[900],
		},
	},
});

theme = createTheme(theme, {
	typography: {
		link: {
			fontSize: '0.8rem',
			[theme.breakpoints.up('md')]: {
				fintSize: '0.9rem',
			},
			fontWeight: 500,
			color: theme.palette.primary['600'],
			display: 'block',
			cursor: 'pointer',
		},
		cartTitle: {
			fontSize: '1.4rem',
			display: 'block',
			fontWeight: 500,
		},
		h6: {
			fontSize: '1rem',
		},
		h7: {
			fontSize: '0.8rem',
		},
		h8: {
			fontSize: '0.7rem',
		},
	},
});

export default theme;
