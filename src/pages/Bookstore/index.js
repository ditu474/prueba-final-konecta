import BookstoreForm from 'components/BookstoreForm';
import bookStoreContext from 'context/bookstore';
import React from 'react';

export default function Bookstore() {
	const bookstoreCtx = React.useContext(bookStoreContext);

	return <BookstoreForm onAddBookstore={bookstoreCtx.addBookstore} />;
}
