import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import App from './App';

describe('App Component', () => {
	test('renders appbar', () => {
		const history = createMemoryHistory();
		render(
			<Router history={history}>
				<App />
			</Router>
		);
		const appbar = screen.getByRole('banner');
		expect(appbar).toBeInTheDocument();
	});
});
