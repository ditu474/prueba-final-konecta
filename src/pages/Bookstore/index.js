import BookstoreForm from 'components/BookstoreForm';
import Bookstores from 'components/Bookstores';
import bookStoreContext from 'context/bookstore';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addBookstore } from 'store/bookstore';

export default function Bookstore() {
	const dispatch = useDispatch();
	const bookstores = useSelector((state) => state.bookstores);
	const { deleteBookstore } = React.useContext(bookStoreContext);

	const newBookstoreHandler = (bookstoreName) => {
		dispatch(addBookstore({ id: Math.random(), name: bookstoreName }));
	};

	const deleteBookstoreHandler = (bookstoreId) => {
		deleteBookstore(bookstoreId);
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
