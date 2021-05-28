import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	bookstores: [],
	error: null,
};

const bookstoreSlice = createSlice({
	name: 'bookstore',
	initialState,
	reducers: {
		addBookstore: () => {},
	},
});

export const { addBookstore } = bookstoreSlice.actions;

export default bookstoreSlice;
