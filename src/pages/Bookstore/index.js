import BookstoreForm from 'components/BookstoreForm';
import Bookstores from 'components/Bookstores';
import bookStoreContext from 'context/bookstore';
import React from 'react';

export default function Bookstore() {
	const { addBookstore, bookstores } = React.useContext(bookStoreContext);

	const newBookstoreHandler = (name) => {
		addBookstore(name);
	};

	return (
		<>
			<BookstoreForm onAddBookstore={newBookstoreHandler} />
			<Bookstores bookstores={bookstores} />
		</>
	);
}
