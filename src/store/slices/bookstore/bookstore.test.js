import bookstoreSlice from '.';

describe('Bookstore Slice', () => {
	test('initial state', () => {
		const result = bookstoreSlice.reducer(undefined, () => {});
		expect(result).toEqual({
			bookstores: [],
			error: null,
		});
	});
});
