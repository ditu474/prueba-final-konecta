import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { MemoryRouter, Route, Router } from 'react-router';
import Appbar from '.';

describe('Appbar Component', () => {
	test('render breaking bad logo', () => {
		render(
			<Router history={createMemoryHistory()}>
				<Appbar />
			</Router>
		);

		const logo = screen.getByRole('img');

		expect(logo).toBeInTheDocument();
		expect(logo).toHaveAttribute('alt', 'Logo breaking bad');
	});

	test('render navigation menu', () => {
		render(
			<Router history={createMemoryHistory()}>
				<Appbar />
			</Router>
		);

		const nav = screen.getByRole('navigation');

		expect(nav).toBeInTheDocument();
	});

	test('navigate to /bookstores when "Mis librerías" is clicked', () => {
		const history = createMemoryHistory();
		render(
			<Router history={history}>
				<Appbar />
			</Router>
		);

		const bookstoresLink = screen.getByText('Mis librerías');
		userEvent.click(bookstoresLink);

		expect(history.location.pathname).toBe('/bookstores');
	});

	test('navigate to / when logo is clicked', () => {
		let testLocation;
		render(
			<MemoryRouter initialEntries={['/my/initial/route']}>
				<Appbar />
				<Route
					path="*"
					render={({ location }) => {
						testLocation = location;
						return null;
					}}
				/>
			</MemoryRouter>
		);

		const logo = screen.getByAltText('Logo breaking bad');
		userEvent.click(logo);

		expect(testLocation.pathname).toBe('/');
	});
});
