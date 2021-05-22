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

	const addBookstore = (name) => {
		const newBookstores = [...bookstores, { id: Math.random(), name }];
		const err = saveBookstores(newBookstores);
		if (err) {
			enqueueSnackbar(`No se logró guardar la librería ${name}`, {
				variant: 'error',
			});
		} else {
			setBookstores(newBookstores);
		}
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
