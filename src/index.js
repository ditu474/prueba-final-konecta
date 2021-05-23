import BookstoreProvider from 'providers/Bookstore';
import SnackbarProvider from 'providers/Snackbar';
import ThemeProvider from 'providers/Theme';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.scss';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
	<React.StrictMode>
		<ThemeProvider>
			<SnackbarProvider>
				<BookstoreProvider>
					<BrowserRouter basename={process.env.PUBLIC_URL}>
						<App />
					</BrowserRouter>
				</BookstoreProvider>
			</SnackbarProvider>
		</ThemeProvider>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
