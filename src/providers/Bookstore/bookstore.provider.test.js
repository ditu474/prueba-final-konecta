import { fireEvent, render, screen } from '@testing-library/react';
import BookstoreContext from 'context/bookstore';
import React from 'react';
import { act } from 'react-dom/test-utils';
import * as bookstoreService from 'services/bookstore';
import BookstoreProvider from '.';

const TestComponent = () => {
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
				onClick={() => addBookstore('New Bookstore')}
			>
				Add Bookstore
			</button>
			<button data-testid="addQuote" onClick={addQuote}>
				Add Quote
			</button>
			<button data-testid="moveQuote" onClick={moveQuote}>
				Move Quote
			</button>
		</>
	);
};

describe('Bookstore Provider', () => {
	test('should not render any bookstore if service returns an empty array', async () => {
		const mockGetSavedBookstores = jest.spyOn(
			bookstoreService,
			'getSavedBookstores'
		);
		mockGetSavedBookstores.mockReturnValue([]);

		render(
			<BookstoreProvider>
				<TestComponent />
			</BookstoreProvider>
		);

		expect(mockGetSavedBookstores).toHaveBeenCalledTimes(1);
		expect(screen.queryAllByTestId('bookstore').length).toBe(0);
		expect(screen.queryAllByTestId('quote').length).toBe(0);

		mockGetSavedBookstores.mockRestore();
	});

	test('return an array with the bookstores saved locally', () => {
		const mockGetSavedBookstores = jest.spyOn(
			bookstoreService,
			'getSavedBookstores'
		);
		mockGetSavedBookstores.mockReturnValue([
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
			<BookstoreProvider>
				<TestComponent />
			</BookstoreProvider>
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

		mockGetSavedBookstores.mockRestore();
	});

	test('add a new bookstore', () => {
		const mockSaveBookstores = jest.spyOn(bookstoreService, 'saveBookstores');
		jest.spyOn(bookstoreService, 'getSavedBookstores').mockReturnValue([]);

		render(
			<BookstoreProvider>
				<TestComponent />
			</BookstoreProvider>
		);

		act(() => {
			fireEvent.click(screen.getByText('Add Bookstore'));
		});

		expect(mockSaveBookstores).toBeCalledTimes(1);
		expect(mockSaveBookstores).toHaveBeenCalledWith([
			{ id: expect.any(Number), name: 'New Bookstore' },
		]);
		expect(screen.queryAllByTestId('bookstore').length).toBe(1);
		expect(screen.getByText('New Bookstore')).toBeInTheDocument();

		mockSaveBookstores.mockRestore();
	});
});
