import React from 'react';
import ReactDOM from 'react-dom';
import App from 'App';
import reportWebVitals from 'reportWebVitals';
import '@fontsource/roboto';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider } from '@material-ui/core';
import theme from 'themes/main';
import './index.css';

ReactDOM.render(
	<React.StrictMode>
		<MuiThemeProvider theme={theme}>
			<CssBaseline />
			<App />
		</MuiThemeProvider>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
