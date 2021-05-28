import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	bookstores: [],
	error: null,
};

const bookstoreSlice = createSlice({
	name: 'bookstore',
	initialState,
});

export default bookstoreSlice;
