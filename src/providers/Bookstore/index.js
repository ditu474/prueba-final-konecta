import BookstoreCtx from 'context/bookstore';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import React from 'react';
import { getSavedBookstores, saveBookstores } from 'services/bookstore';

const BookstoreProvider = ({ children }) => {
	const [bookstores, setBookstores] = React.useState([]);
	const { enqueueSnackbar } = useSnackbar();

	React.useEffect(() => {
		const savedBookstores = getSavedBookstores();
		setBookstores(savedBookstores);
	}, []);

	const updateBookstores = (newBookstores) => {
		const err = saveBookstores(newBookstores);
		if (err) {
			return err;
		} else {
			setBookstores(newBookstores);
		}
	};

	const addBookstore = (name) => {
		const newBookstores = [
			...bookstores,
			{ id: Math.random(), name, quotes: [] },
		];
		const err = updateBookstores(newBookstores);
		if (err) {
			enqueueSnackbar(`No se logró guardar la librería ${name}`, {
				variant: 'error',
			});
		}
	};

	const addQuote = (quote, bookstoreId) => {
		const newBookstores = [...bookstores];
		const bookstore = newBookstores.find(
			(bookstore) => bookstore.id === bookstoreId
		);
		bookstore.quotes.push(quote);
		updateBookstores(newBookstores);
	};

	const ctxValue = {
		bookstores,
		addBookstore,
		addQuote,
	};

	return (
		<BookstoreCtx.Provider value={ctxValue}>{children}</BookstoreCtx.Provider>
	);
};

BookstoreProvider.propTypes = {
	children: PropTypes.element.isRequired,
};

export default BookstoreProvider;
