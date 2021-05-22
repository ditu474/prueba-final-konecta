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
			<BookstoreCtx.Provider
				value={{ addBookstore: addBookstoreSpy, bookstores: [] }}
			>
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

	test('restart the state of the form when submitted', async () => {
		render(
			<BookstoreCtx.Provider
				value={{ addBookstore: jest.fn(), bookstores: [] }}
			>
				<Bookstore />
			</BookstoreCtx.Provider>
		);

		fireEvent.input(screen.getByPlaceholderText('Nombre de librería'), {
			target: { value: 'Mis favoritos' },
		});
		fireEvent.click(screen.getByText('Crear'));

		const input = await screen.findByPlaceholderText('Nombre de librería');
		expect(input.value).toBe('');
	});

	test('render the bookstores provided by the context provider', () => {
		render(
			<BookstoreCtx.Provider
				value={{ bookstores: [{ id: 1, name: 'Library Test', quotes: [] }] }}
			>
				<Bookstore />
			</BookstoreCtx.Provider>
		);

		expect(screen.getByText('Library Test')).toBeInTheDocument();
		expect(screen.getByLabelText('Open bookstore')).toBeInTheDocument();
		expect(screen.getByLabelText('Delete bookstore')).toBeInTheDocument();
	});

	test('do not display the library quotes until user opens the library', () => {
		render(
			<BookstoreCtx.Provider
				value={{
					bookstores: [
						{
							id: 1,
							name: 'Library Test',
							quotes: [
								{ id: 2, quote: 'Test Quote 1' },
								{ id: 3, quote: 'Test Quote 2' },
							],
						},
					],
				}}
			>
				<Bookstore />
			</BookstoreCtx.Provider>
		);

		expect(screen.queryByText('Test Quote 1')).not.toBeVisible();
		expect(screen.queryByText('Test Quote 2')).not.toBeVisible();

		fireEvent.click(screen.getByText('Library Test'));

		expect(screen.queryByText('Test Quote 1')).toBeVisible();
		expect(screen.queryByText('Test Quote 2')).toBeVisible();
		expect(screen.queryAllByLabelText('Move Quote').length).toBe(2);
		expect(screen.queryAllByLabelText('Delete Quote').length).toBe(2);
	});

	test('call deleteBookstore from provider with correct values', () => {
		const deleteBookstoreSpy = jest.fn();
		render(
			<BookstoreCtx.Provider
				value={{
					bookstores: [{ id: 3, name: 'Library Test', quotes: [] }],
					deleteBookstore: deleteBookstoreSpy,
				}}
			>
				<Bookstore />
			</BookstoreCtx.Provider>
		);

		fireEvent.click(screen.getByLabelText('Delete bookstore'));

		expect(deleteBookstoreSpy).toHaveBeenCalledTimes(1);
		expect(deleteBookstoreSpy).toHaveBeenCalledWith(3);
	});

	test('call deleteQuote from provider with correct values', () => {
		const deleteQuoteSpy = jest.fn();
		render(
			<BookstoreCtx.Provider
				value={{
					bookstores: [
						{
							id: 3,
							name: 'Library Test',
							quotes: [{ id: 10, quote: 'Test Quote 1' }],
						},
					],
					deleteQuote: deleteQuoteSpy,
				}}
			>
				<Bookstore />
			</BookstoreCtx.Provider>
		);

		fireEvent.click(screen.getByLabelText('Delete Quote'));

		expect(deleteQuoteSpy).toHaveBeenCalledTimes(1);
		expect(deleteQuoteSpy).toHaveBeenCalledWith(10, 3);
	});

	test('display the bookstores when user clicks the move button', () => {
		render(
			<BookstoreCtx.Provider
				value={{
					bookstores: [
						{
							id: 3,
							name: 'Library Test',
							quotes: [{ id: 10, quote: 'Test Quote 1' }],
						},
						{
							id: 5,
							name: 'Favoritos',
							quotes: [],
						},
						{
							id: 10,
							name: 'Empty',
							quotes: [],
						},
					],
				}}
			>
				<Bookstore />
			</BookstoreCtx.Provider>
		);

		fireEvent.click(screen.getByText('Library Test'));

		expect(screen.queryAllByText('Library Test').length).toBe(1);
		expect(screen.queryAllByText('Favoritos')[1]).not.toBeVisible();
		expect(screen.queryAllByText('Empty')[1]).not.toBeVisible();

		fireEvent.click(screen.getByLabelText('Move Quote'));

		expect(screen.queryAllByText('Favoritos')[1]).toBeVisible();
		expect(screen.queryAllByText('Empty')[1]).toBeVisible();
	});
});
