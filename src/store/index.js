import { configureStore } from '@reduxjs/toolkit';
import { saveBookstores } from 'services/bookstore';
import bookstoreSlice from './bookstore';

const store = configureStore({
	reducer: bookstoreSlice.reducer,
});

store.subscribe(() => {
	const newBookstores = store.getState().bookstores;
	saveBookstores(newBookstores);
});

export default store;
