import { render, screen } from '@testing-library/react';
import Appbar from '.';

describe('Appbar Component', () => {
	beforeEach(() => {
		render(<Appbar />);
	});

	test('render breaking bad logo', () => {
		const logo = screen.getByRole('img');
		expect(logo).toBeInTheDocument();
		expect(logo).toHaveAttribute('alt', 'Logo breaking bad');
	});

	test('render navigation menu', () => {
		const nav = screen.getByRole('navigation');
		expect(nav).toBeInTheDocument();
	});
});
