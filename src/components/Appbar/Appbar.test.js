import { render, screen } from '@testing-library/react';
import Appbar from '.';

describe('Appbar Component', () => {
	test('render breaking bad logo', () => {
		render(<Appbar />);
		const logo = screen.getByRole('img');
		expect(logo).toBeInTheDocument();
		expect(logo).toHaveAttribute('alt', 'Logo breaking bad');
	});
});
