import createMockStore from 'redux-mock-store';
import * as bookstoreService from 'services/bookstore';

describe('Bookstore Slice', () => {
	const mockStore = createMockStore();
	let getSavedBookstoresSpy;

	beforeAll(() => {
		getSavedBookstoresSpy = jest
			.spyOn(bookstoreService, 'getSavedBookstores')
			.mockReturnValue([]);
	});

	afterEach(() => {
		jest.restoreAllMocks();
	});

	describe('given empty action and undefined state', () => {
		it('should return the initial state', () => {
			const savedBookstores = [
				{
					id: 10,
					name: 'Mis Favoritos',
					quotes: [
						{
							id: 1,
							quote: 'quote 1',
						},
						{
							id: 2,
							quote: 'quote 2',
						},
					],
				},
				{
					id: 20,
					name: 'Graciosos',
				},
			];
			getSavedBookstoresSpy.mockReturnValueOnce(savedBookstores);

			// Se debe importar luego del mock, para que llame al mock y no se cargue
			// el slice antes de hacer el mock
			// si se hace el import en la parte superior del archivo, el slice se ejecuta
			// y hace la llamada al servicio, y esto no es lo que se quiere
			const bookstoreSlice = require('.').default;
			const result = bookstoreSlice.reducer(undefined, () => {});

			expect(result).toEqual({
				bookstores: savedBookstores,
				error: null,
			});
		});
	});

	describe('for the action', () => {
		let bookstoreSlice, addBookstore, addQuote;

		beforeAll(() => {
			bookstoreSlice = require('.').default;
			addBookstore = bookstoreSlice.actions.addBookstore;
			addQuote = bookstoreSlice.actions.addQuote;
		});

		describe('addBookstore', () => {
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

			it('should set the state with a new bookstore', () => {
				const initialState = { bookstores: [], error: null };
				const newBookstore = { id: 10, name: 'Hello' };

				const newState = bookstoreSlice.reducer(
					initialState,
					addBookstore(newBookstore)
				);

				const expectedState = {
					bookstores: [{ id: 10, name: 'Hello', quotes: [] }],
					error: null,
				};
				expect(newState).toEqual(expectedState);
			});

			it('should set an error if bookstore name already exists', () => {
				const initialState = {
					bookstores: [{ id: 22, name: 'Hello', quotes: [] }],
					error: null,
				};
				const newBookstore = { id: 10, name: 'Hello' };

				const newState = bookstoreSlice.reducer(
					initialState,
					addBookstore(newBookstore)
				);

				const expectedState = {
					bookstores: [{ id: 22, name: 'Hello', quotes: [] }],
					error: 'Ya existe una librería con el nombre Hello',
				};
				expect(newState).toEqual(expectedState);
			});
		});

		describe('addQuote', () => {
			it('should dispatch the correct type and payload', () => {
				const store = mockStore();
				const newQuote = { id: 10, quote: 'test quote' };

				store.dispatch(addQuote({ quote: newQuote, bookstoreId: 10 }));

				const actions = store.getActions();
				const expectedActions = [
					{
						type: 'bookstore/addQuote',
						payload: { quote: newQuote, bookstoreId: 10 },
					},
				];
				expect(actions).toEqual(expectedActions);
			});

			it('should add the quote to the bookstore', () => {
				const initialState = {
					bookstores: [{ id: 22, name: 'Hello', quotes: [] }],
					error: null,
				};
				const newQuote = { id: 10, quote: 'test quote' };

				const newState = bookstoreSlice.reducer(
					initialState,
					addQuote({ quote: newQuote, bookstoreId: 22 })
				);

				const expectedState = {
					bookstores: [{ id: 22, name: 'Hello', quotes: [newQuote] }],
					error: null,
				};
				expect(newState).toEqual(expectedState);
			});
		});
	});
});
