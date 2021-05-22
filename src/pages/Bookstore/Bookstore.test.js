import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import BookstoreCtx from 'context/bookstore';
import Bookstore from '.';

describe('Bookstore Page', () => {
	test('display error message if user send form with blank input', async () => {
		render(<Bookstore />);

		fireEvent.click(screen.getByText('Crear'));

		await waitFor(() => {
			expect(screen.getByText('Debes ingresar un nombre')).toBeInTheDocument();
		});
	});

	test('display error message if user type an invalid bookstore name', async () => {
		render(<Bookstore />);

		fireEvent.change(screen.getByPlaceholderText('Nombre de librería'), {
			target: { value: '1nval1d n4m3' },
		});
		fireEvent.click(screen.getByText('Crear'));

		await waitFor(() => {
			expect(
				screen.getByText('El nombre sólo debe contener alfanuméricos')
			).toBeInTheDocument();
		});
	});

	test('call addBookstore context function with correct values', async () => {
		const addBookstoreSpy = jest.fn();
		render(
			<BookstoreCtx.Provider value={{ addBookstore: addBookstoreSpy }}>
				<Bookstore />
			</BookstoreCtx.Provider>
		);

		fireEvent.input(screen.getByPlaceholderText('Nombre de librería'), {
			target: { value: 'Mis favoritos' },
		});
		fireEvent.click(screen.getByText('Crear'));

		await waitFor(() => {
			expect(addBookstoreSpy).toHaveBeenCalledTimes(1);
			expect(addBookstoreSpy).toHaveBeenCalledWith('Mis favoritos');
		});
	});
});
