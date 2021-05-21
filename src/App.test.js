import { render, screen } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
	test('renders appbar', () => {
		render(<App />);
		const appbar = screen.getByRole('banner');
		expect(appbar).toBeInTheDocument();
	});
});
