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
		const newBookstores = [...bookstores];
		const bookstore = newBookstores.find((bs) => bs.name === name);
		if (bookstore) {
			enqueueSnackbar(`Ya existe una librería con el nombre ${name}`, {
				variant: 'error',
			});
		} else {
			newBookstores.push({ id: Math.random(), name, quotes: [] });
			const err = updateBookstores(newBookstores);
			if (err) {
				enqueueSnackbar(`No se logró guardar la librería ${name}`, {
					variant: 'error',
				});
			}
		}
	};

	const addQuote = (quote, bookstoreId) => {
		const newBookstores = [...bookstores];
		const bookstore = newBookstores.find(
			(bookstore) => bookstore.id === bookstoreId
		);
		const quoteIndex = bookstore.quotes.findIndex(
			(bookStoreQuote) => bookStoreQuote.quote === quote.quote
		);
		if (quoteIndex !== -1) {
			enqueueSnackbar('La frase ya existe en la librería', {
				variant: 'error',
			});
		} else {
			bookstore.quotes.push(quote);
			const err = updateBookstores(newBookstores);
			if (err) {
				enqueueSnackbar('No se logró guardar la frase', {
					variant: 'error',
				});
			}
		}
	};

	const moveQuote = (quoteId, fromId, toId) => {
		const newBookstores = [...bookstores];
		const from = newBookstores.find((bookstore) => bookstore.id === fromId);
		const to = newBookstores.find((bookstore) => bookstore.id === toId);
		const quoteIndex = from.quotes.findIndex((quote) => quote.id === quoteId);
		const quote = from.quotes[quoteIndex];
		from.quotes.splice(quoteIndex, 1);
		to.quotes.push(quote);
		updateBookstores(newBookstores);
	};

	const ctxValue = {
		bookstores,
		addBookstore,
		addQuote,
		moveQuote,
	};

	return (
		<BookstoreCtx.Provider value={ctxValue}>{children}</BookstoreCtx.Provider>
	);
};

BookstoreProvider.propTypes = {
	children: PropTypes.element.isRequired,
};

export default BookstoreProvider;
