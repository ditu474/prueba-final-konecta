import { render, screen, waitFor } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { MemoryRouter, Router } from 'react-router-dom';
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

	test('render a form to create a new bookstore', async () => {
		render(
			<MemoryRouter initialEntries={['/bookstores']}>
				<App />
			</MemoryRouter>
		);

		await waitFor(() => {
			expect(screen.getByRole('form')).toBeInTheDocument();
			expect(
				screen.getByPlaceholderText('Nombre de librería')
			).toBeInTheDocument();
			expect(screen.getByText('Crear')).toBeInTheDocument();
		});
	});
});
