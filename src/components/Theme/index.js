import { green, purple } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import React from 'react';

const theme = createMuiTheme({
	palette: {
		primary: {
			main: purple[500],
			light: purple[300],
			dark: purple[700],
		},
		secondary: {
			main: green[700],
			light: green[500],
			dark: green[900],
		},
	},
});

export default function Theme({ children }) {
	return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
