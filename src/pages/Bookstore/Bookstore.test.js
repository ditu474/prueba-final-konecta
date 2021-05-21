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

	test('display error message if user type an invalid bookstore name', async () => {
		render(<Bookstore />);

		UserEvent.type(
			screen.getByPlaceholderText('Nombre de librería'),
			'1nval1d n4m3'
		);
		UserEvent.click(screen.getByText('Crear'));

		await waitFor(() => {
			expect(
				screen.getByText('El nombre sólo debe contener alfanuméricos')
			).toBeInTheDocument();
		});
	});
});
