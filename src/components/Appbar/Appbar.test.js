import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from "history";
import { Router } from "react-router";
import Appbar from '.';

describe('Appbar Component', () => {
    let history;
    beforeEach(() => {
        history = createMemoryHistory();
        render(
            <Router history={history}>
              <Appbar/>
            </Router>
          );
    })

	test('render breaking bad logo', () => {
		const logo = screen.getByRole('img');

		expect(logo).toBeInTheDocument();
		expect(logo).toHaveAttribute('alt', 'Logo breaking bad');
	});

	test('render navigation menu', () => {
		const nav = screen.getByRole('navigation');

		expect(nav).toBeInTheDocument();
	});

    test('navigate to /bookstores when "Mis librerías" is clicked', () => {
        const bookstoresLink = screen.getByText('Mis librerías');
        userEvent.click(bookstoresLink);

        expect(history.location.pathname).toBe('/bookstores')

    })
});
