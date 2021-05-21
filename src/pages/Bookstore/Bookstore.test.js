import { render, screen, waitFor } from '@testing-library/react';
import UserEvent from '@testing-library/user-event';
import Bookstore from '.';

describe('Bookstore Page', () => {
	test('display error message if user send form with blank input', async () => {
		render(<Bookstore />);

		UserEvent.click(screen.getByText('Crear'));

		await waitFor(() => {
			expect(screen.getByText('Debes ingresar un nombre')).toBeInTheDocument();
		});
	});
});
