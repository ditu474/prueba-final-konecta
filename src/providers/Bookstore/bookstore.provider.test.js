import { render, screen } from '@testing-library/react';
import BookstoreContext from 'context/bookstore';
import React from 'react';
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
							{bookstore.quotes.map((quote) => (
								<li key={quote.id} data-testid="quote">
									{quote.quote}
								</li>
							))}
						</ul>
					</li>
				))}
			</ul>
			<button data-testid="addBookstore" onClick={addBookstore}>
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
});
