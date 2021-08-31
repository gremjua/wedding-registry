import { createMuiTheme } from '@material-ui/core/styles';
import pink from '@material-ui/core/colors/pink';

const font = `'Comfortaa', sans-serif`;

const theme = createMuiTheme({
	palette: {
		primary: {
			main: '#fff3e0',
		},
		secondary: pink,
		background: {
			default: '#9ed0cb',
		},
	},
	overrides: {
		MuiButton: {
			containedPrimary: {
				backgroundColor: '#000000',
				color: '#FFFFFF',
			},
		},
	},
	typography: {
		fontFamily: font,
		fontSize: 12,
	},
});

export default theme;
