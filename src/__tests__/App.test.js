import { render, screen, waitFor } from '@testing-library/react';
import App from 'App';
import { createMemoryHistory } from 'history';
import { MemoryRouter, Router } from 'react-router-dom';

describe('App Component', () => {
	test('renders appbar', () => {
		render(
			<MemoryRouter initialEntries={['/']}>
				<App />
			</MemoryRouter>
		);
		const appbar = screen.getByRole('banner');
		expect(appbar).toBeInTheDocument();
	});

	test('Redirect to the home page when user go to unexisting route', () => {
		const history = createMemoryHistory();
		history.push('/unexisting-route');

		render(
			<Router history={history}>
				<App />
			</Router>
		);

		expect(history.location.pathname).toBe('/characters');
	});

	test.skip('render a list of characters on the home page with paginator', async () => {
		render(
			<MemoryRouter initialEntries={['/']}>
				<App />
			</MemoryRouter>
		);

		await waitFor(() => {
			expect(screen.queryByText('Filtros Avanzados')).toBeInTheDocument();
			// Se resta el link de navegación
			expect(screen.queryAllByRole('list').length - 1).toBe(1);
			expect(screen.queryAllByRole('listitem').length - 1).toBe(5);
			expect(screen.queryByLabelText('Page number').textContent).toBe('1');
			expect(screen.queryByLabelText('Previous page')).toBeDisabled();
			expect(screen.queryByLabelText('Next page')).toBeInTheDocument();
		});
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
