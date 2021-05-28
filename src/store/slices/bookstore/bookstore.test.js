import createMockStore from 'redux-mock-store';
import bookstoreSlice, { addBookstore } from '.';

describe('Bookstore Slice', () => {
	const mockStore = createMockStore();

	describe('given empty action and undefined state', () => {
		it('should return the initial state', () => {
			const result = bookstoreSlice.reducer(undefined, () => {});
			expect(result).toEqual({
				bookstores: [],
				error: null,
			});
		});
	});

	describe('on addBookstore action', () => {
		it('should dispatch the correct type and payload', () => {
			const store = mockStore();
			const newBookstore = { id: 10, name: 'Hello' };
			store.dispatch(addBookstore(newBookstore));

			const actions = store.getActions();
			const expectedActions = [
				{ type: 'bookstore/addBookstore', payload: newBookstore },
			];
			expect(actions).toEqual(expectedActions);
		});
	});
});
