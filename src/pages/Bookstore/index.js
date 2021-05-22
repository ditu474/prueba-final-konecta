import BookstoreForm from 'components/BookstoreForm';
import Bookstores from 'components/Bookstores';
import bookStoreContext from 'context/bookstore';
import React from 'react';

export default function Bookstore() {
	const { addBookstore, bookstores, deleteBookstore } =
		React.useContext(bookStoreContext);

	const newBookstoreHandler = (name) => {
		addBookstore(name);
	};

	const deleteBookstoreHandler = (id) => {
		deleteBookstore(id);
	};

	return (
		<>
			<BookstoreForm onAddBookstore={newBookstoreHandler} />
			<Bookstores
				bookstores={bookstores}
				onBookstoreDelete={deleteBookstoreHandler}
			/>
		</>
	);
}
