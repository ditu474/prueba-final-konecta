import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	bookstores: [],
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

			state.bookstores.push(payload);
		},
	},
});

export const { addBookstore } = bookstoreSlice.actions;

export default bookstoreSlice;
