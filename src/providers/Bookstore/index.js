import BookstoreCtx from 'context/bookstore';
import PropTypes from 'prop-types';
import React from 'react';
import { getSavedBookstores } from 'services/bookstore';

const BookstoreProvider = ({ children }) => {
	const [bookstores, setBookstores] = React.useState([]);

	React.useEffect(() => {
		setBookstores(getSavedBookstores());
	}, []);

	const addBookstore = (name) => {
		console.log('From provider ', name);
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
