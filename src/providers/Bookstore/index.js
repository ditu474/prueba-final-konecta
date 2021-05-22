import BookstoreCtx from 'context/bookstore';
import PropTypes from 'prop-types';
import React from 'react';
import { getSavedBookstores, saveBookstores } from 'services/bookstore';

const BookstoreProvider = ({ children }) => {
	const [bookstores, setBookstores] = React.useState([]);

	React.useEffect(() => {
		setBookstores(getSavedBookstores());
	}, []);

	const addBookstore = (name) => {
		setBookstores((prevBookstores) => {
			const newBookstores = [...prevBookstores, { id: Math.random(), name }];
			saveBookstores(newBookstores);
			return newBookstores;
		});
	};

	const ctxValue = {
		bookstores,
		addBookstore,
	};

	return (
		<BookstoreCtx.Provider value={ctxValue}>{children}</BookstoreCtx.Provider>
	);
};

BookstoreProvider.propTypes = {
	children: PropTypes.element.isRequired,
};

export default BookstoreProvider;
