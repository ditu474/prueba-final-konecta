import { createSlice } from '@reduxjs/toolkit';
import { getSavedBookstores } from 'services/bookstore';

const initialState = {
	bookstores: getSavedBookstores(),
	error: null,
};

const bookstoreSlice = createSlice({
	name: 'bookstore',
	initialState,
	reducers: {
		addBookstore: (state, { payload }) => {
			const bookstore = state.bookstores.find(
				(bookstore) => bookstore.name === payload.name
			);
			if (!!bookstore) {
				state.error = `Ya existe una librería con el nombre ${payload.name}`;
				return;
			}

			state.bookstores.push({ ...payload, quotes: [] });
		},
		addQuote: (state, { payload }) => {
			const bookstore = state.bookstores.find(
				(bookstore) => bookstore.id === payload.bookstoreId
			);

			const quoteInBookstore = bookstore.quotes.find(
				(quote) => quote.name === payload.quote.name
			);
			if (!!quoteInBookstore) {
				state.error = 'Ya existe la frase en la librería';
				return;
			}

			bookstore.quotes.push(payload.quote);
		},
	},
});

export const { addBookstore } = bookstoreSlice.actions;

export default bookstoreSlice;
