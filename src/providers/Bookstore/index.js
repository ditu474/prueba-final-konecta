import BookstoreCtx from 'context/bookstore';
import PropTypes from 'prop-types';

const BookstoreProvider = ({ children }) => {
	const addBookstore = (name) => {
		console.log('From provider ', name);
	};

	const ctxValue = {
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
