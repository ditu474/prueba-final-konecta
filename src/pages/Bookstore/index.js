import BookstoreForm from 'components/BookstoreForm';
import Bookstores from 'components/Bookstores';
import bookStoreContext from 'context/bookstore';
import React from 'react';

export default function Bookstore() {
	const { addBookstore, bookstores, deleteBookstore, deleteQuote } =
		React.useContext(bookStoreContext);

	const newBookstoreHandler = (bookstoreName) => {
		addBookstore(bookstoreName);
	};

	const deleteBookstoreHandler = (bookstoreId) => {
		deleteBookstore(bookstoreId);
	};

	const deleteQuoteHandler = (quoteId, bookstoreId) => {
		deleteQuote(quoteId, bookstoreId);
	};

	return (
		<>
			<BookstoreForm onAddBookstore={newBookstoreHandler} />
			<Bookstores
				bookstores={bookstores}
				onBookstoreDelete={deleteBookstoreHandler}
				onQuoteDelete={deleteQuoteHandler}
			/>
		</>
	);
}
