import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import BookstoreContext from 'context/bookstore';
import SnackbarProvider from 'providers/Snackbar';
import React from 'react';
import { act } from 'react-dom/test-utils';
import * as bookstoreService from 'services/bookstore';
import BookstoreProvider from '.';

const TestComponent = ({ onAddBookstore, onAddQuote, onMoveQuote }) => {
	const { bookstores, addBookstore, addQuote, moveQuote } =
		React.useContext(BookstoreContext);
	return (
		<>
			<ul>
				{bookstores.map((bookstore) => (
					<li key={bookstore.id} data-testid="bookstore">
						{bookstore.name}
						<ul>
							{bookstore.quotes?.map((quote) => (
								<li key={quote.id} data-testid="quote">
									{quote.quote}
								</li>
							))}
						</ul>
					</li>
				))}
			</ul>
			<button
				data-testid="addBookstore"
				onClick={() => onAddBookstore(addBookstore)}
			>
				Add Bookstore
			</button>
			<button data-testid="addQuote" onClick={() => onAddQuote(addQuote)}>
				Add Quote
			</button>
			<button data-testid="moveQuote" onClick={() => onMoveQuote(moveQuote)}>
				Move Quote
			</button>
		</>
	);
};

describe('Bookstore Provider', () => {
	beforeEach(() => {
		// No se usa por que se necesita primero hacer el mock y luego el render
	});

	afterEach(() => {
		jest.restoreAllMocks();
	});

	test('should not render any bookstore if service returns an empty array', () => {
		const mockGetSavedBookstores = jest
			.spyOn(bookstoreService, 'getSavedBookstores')
			.mockReturnValue([]);

		render(
			<SnackbarProvider>
				<BookstoreProvider>
					<TestComponent />
				</BookstoreProvider>
			</SnackbarProvider>
		);

		expect(mockGetSavedBookstores).toHaveBeenCalledTimes(1);
		expect(screen.queryAllByTestId('bookstore').length).toBe(0);
		expect(screen.queryAllByTestId('quote').length).toBe(0);
	});

	test('return an array with the bookstores saved locally', () => {
		jest.spyOn(bookstoreService, 'getSavedBookstores').mockReturnValue([
			{
				id: Math.random(),
				name: 'Mis Favoritos',
				quotes: [
					{
						id: Math.random(),
						quote: 'quote 1',
					},
					{
						id: Math.random(),
						quote: 'quote 2',
					},
				],
			},
			{
				id: Math.random(),
				name: 'Graciosos',
			},
		]);

		render(
			<SnackbarProvider>
				<BookstoreProvider>
					<TestComponent />
				</BookstoreProvider>
			</SnackbarProvider>
		);

		expect(screen.queryAllByTestId('bookstore').length).toBe(2);
		expect(screen.queryAllByTestId('quote').length).toBe(2);
		const bookstore1 = screen.queryByText('Mis Favoritos');
		expect(bookstore1).toBeInTheDocument();
		expect(bookstore1.children.item(0).children.item(0).textContent).toBe(
			'quote 1'
		);
		expect(bookstore1.children.item(0).children.item(1).textContent).toBe(
			'quote 2'
		);
		expect(screen.queryByText('Graciosos')).toBeInTheDocument();
	});

	test('add a new bookstore', async () => {
		const mockSaveBookstores = jest.spyOn(bookstoreService, 'saveBookstores');
		jest.spyOn(bookstoreService, 'getSavedBookstores').mockReturnValue([]);
		const newBookstoreName = 'Test New Bookstore';
		const addBookstore = (func) => {
			func(newBookstoreName);
		};

		render(
			<SnackbarProvider>
				<BookstoreProvider>
					<TestComponent onAddBookstore={addBookstore} />
				</BookstoreProvider>
			</SnackbarProvider>
		);

		act(() => {
			fireEvent.click(screen.getByText('Add Bookstore'));
		});

		await waitFor(() => {
			expect(mockSaveBookstores).toBeCalledTimes(1);
			expect(mockSaveBookstores).toHaveBeenCalledWith([
				{ id: expect.any(Number), name: newBookstoreName, quotes: [] },
			]);
			expect(screen.queryAllByTestId('bookstore').length).toBe(1);
			expect(screen.getByText(newBookstoreName)).toBeInTheDocument();
			expect(screen.getByText(`Se creó la librería ${newBookstoreName}`)).toBeInTheDocument();
		});
	});

	test('display an snackbar if add a new bookstore fails', async () => {
		jest
			.spyOn(bookstoreService, 'saveBookstores')
			.mockReturnValue(() => 'Error');
		const newBookstoreName = 'The bests';
		const addBookstore = (func) => {
			func(newBookstoreName);
		};

		render(
			<SnackbarProvider>
				<BookstoreProvider>
					<TestComponent onAddBookstore={addBookstore} />
				</BookstoreProvider>
			</SnackbarProvider>
		);

		act(() => {
			fireEvent.click(screen.getByText('Add Bookstore'));
		});

		await waitFor(() => {
			expect(
				screen.getByText(`No se logró guardar la librería ${newBookstoreName}`)
			).toBeInTheDocument();
		});
	});

	test('should not update state if add a new bookstore fails', () => {
		jest
			.spyOn(bookstoreService, 'saveBookstores')
			.mockReturnValue(() => 'Error');
		jest.spyOn(bookstoreService, 'getSavedBookstores').mockReturnValue([
			{
				id: Math.random(),
				name: 'Mis Favoritos',
				quotes: [
					{
						id: Math.random(),
						quote: 'quote 1',
					},
				],
			},
		]);
		const addBookstore = (func) => {
			func('Any');
		};

		render(
			<SnackbarProvider>
				<BookstoreProvider>
					<TestComponent onAddBookstore={addBookstore} />
				</BookstoreProvider>
			</SnackbarProvider>
		);

		act(() => {
			fireEvent.click(screen.getByText('Add Bookstore'));
		});

		expect(screen.queryByText('Any')).not.toBeInTheDocument();
		expect(screen.queryAllByTestId('bookstore').length).toBe(1);
		expect(screen.queryAllByTestId('quote').length).toBe(1);
	});

	test('display snackbar if library name already exists', () => {
		const newBookstoreName = 'Test New Bookstore';
		jest.spyOn(bookstoreService, 'getSavedBookstores').mockReturnValue([
			{
				id: 10,
				name: newBookstoreName,
				quotes: [],
			},
		]);
		const addBookstore = (func) => {
			func(newBookstoreName);
		};

		render(
			<SnackbarProvider>
				<BookstoreProvider>
					<TestComponent onAddBookstore={addBookstore} />
				</BookstoreProvider>
			</SnackbarProvider>
		);

		act(() => {
			fireEvent.click(screen.getByText('Add Bookstore'));
		});

		expect(screen.queryAllByTestId('bookstore').length).toBe(1);
		expect(
			screen.getByText(
				`Ya existe una librería con el nombre ${newBookstoreName}`
			)
		).toBeInTheDocument();
	});

	test('add a quote to library', () => {
		jest.spyOn(bookstoreService, 'getSavedBookstores').mockReturnValue([
			{
				id: 10,
				name: 'Mis Favoritos',
				quotes: [],
			},
		]);
		const newQuote = {
			id: Math.random(),
			quote: 'This is a test quote',
		};
		const addToLibrary = (func) => {
			func(newQuote, 10);
		};

		render(
			<SnackbarProvider>
				<BookstoreProvider>
					<TestComponent onAddQuote={addToLibrary} />
				</BookstoreProvider>
			</SnackbarProvider>
		);

		act(() => {
			fireEvent.click(screen.getByTestId('addQuote'));
		});

		expect(screen.getAllByTestId('quote').length).toBe(1);
		expect(screen.getByText(newQuote.quote)).toBeInTheDocument();
	});

	test('display snackbar if quote already exist in library', () => {
		jest.spyOn(bookstoreService, 'getSavedBookstores').mockReturnValue([
			{
				id: 10,
				name: 'Mis Favoritos',
				quotes: [],
			},
		]);
		const newQuote = {
			id: Math.random(),
			quote: 'This is a test quote',
		};
		const addToLibrary = (func) => {
			func(newQuote, 10);
		};

		render(
			<SnackbarProvider>
				<BookstoreProvider>
					<TestComponent onAddQuote={addToLibrary} />
				</BookstoreProvider>
			</SnackbarProvider>
		);

		act(() => {
			fireEvent.click(screen.getByTestId('addQuote'));
			fireEvent.click(screen.getByTestId('addQuote'));
		});

		expect(screen.getAllByTestId('quote').length).toBe(1);
		expect(
			screen.getByText('La frase ya existe en la librería')
		).toBeInTheDocument();
	});

	test('display snackbar if the new quote could not be save', () => {
		jest
			.spyOn(bookstoreService, 'saveBookstores')
			.mockReturnValue(() => 'Error');
		jest.spyOn(bookstoreService, 'getSavedBookstores').mockReturnValue([
			{
				id: 10,
				name: 'Mis Favoritos',
				quotes: [],
			},
		]);
		const newQuote = {
			id: Math.random(),
			quote: 'This is a test quote',
		};
		const addToLibrary = (func) => {
			func(newQuote, 10);
		};

		render(
			<SnackbarProvider>
				<BookstoreProvider>
					<TestComponent onAddQuote={addToLibrary} />
				</BookstoreProvider>
			</SnackbarProvider>
		);

		act(() => {
			fireEvent.click(screen.getByTestId('addQuote'));
		});

		expect(screen.queryAllByTestId('quote').length).toBe(0);
		expect(
			screen.getByText('No se logró guardar la frase')
		).toBeInTheDocument();
	});

	test('move quote to another library', () => {
		jest.spyOn(bookstoreService, 'getSavedBookstores').mockReturnValue([
			{
				id: 10,
				name: 'Favoritos',
				quotes: [],
			},
			{
				id: 9,
				name: 'Any',
				quotes:[
					{
						id: 1,
						quote: 'quote 1',
					},
					{
						id: 2,
						quote: 'quote 2',
					},
				],
			}
		]);

		const onMoveQuote = (func) => {
			func(1, 9, 10) 
		}

		render(
			<SnackbarProvider>
				<BookstoreProvider>
					<TestComponent onMoveQuote={onMoveQuote}/>
				</BookstoreProvider>
			</SnackbarProvider>
		);

		act(() => {
			fireEvent.click(screen.getByTestId('moveQuote'));
		})

		expect(screen.queryByText('Favoritos').children.item(0).children.item(0).textContent).toBe(
			'quote 1'
		);
		expect(screen.queryByText('Any').children.item(0).children.item(0).textContent).toBe(
			'quote 2'
		);
	})
});
