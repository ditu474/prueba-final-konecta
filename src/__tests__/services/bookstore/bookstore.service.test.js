import { getSavedBookstores, saveBookstores } from 'services/bookstore';

describe('Bookstore Service', () => {
	test('return bookstores saved locally', () => {
		const returnValue = [
			{
				id: Math.random(),
				name: 'Mis Favoritos',
				quotes: [
					{
						id: Math.random(),
						quote: 'quote 1',
					},
					{
						id: Math.random(),
						quote: 'quote 2',
					},
				],
			},
			{
				id: Math.random(),
				name: 'Graciosos',
				quotes: [
					{
						id: Math.random(),
						quote: 'quote 3',
					},
					{
						id: Math.random(),
						quote: 'quote 4',
					},
				],
			},
		];
		const getItemMock = jest.fn(() => JSON.stringify(returnValue));
		Storage.prototype.getItem = getItemMock;

		const response = getSavedBookstores();

		expect(getItemMock).toHaveBeenCalledTimes(1);
		expect(getItemMock).toHaveBeenCalledWith('bookstores');
		expect(response).toEqual(returnValue);
	});

	test('return an empty array there is no bookstores', () => {
		Storage.prototype.getItem = jest.fn(() => null);

		const response = getSavedBookstores();

		expect(response).toEqual([]);
	});

	test('save the bookstores locally', () => {
		const bookstores = [
			{
				id: Math.random(),
				name: 'Mis Favoritos',
				quotes: [
					{
						id: Math.random(),
						quote: 'quote 1',
					},
					{
						id: Math.random(),
						quote: 'quote 2',
					},
				],
			},
		];
		const saveItemMock = jest.fn();
		Storage.prototype.setItem = saveItemMock;

		saveBookstores(bookstores);

		expect(saveItemMock).toBeCalledTimes(1);
		expect(saveItemMock).toHaveBeenCalledWith(
			'bookstores',
			JSON.stringify(bookstores)
		);
	});

	test('saveBookstores return error if save locally throws', () => {
		Storage.prototype.setItem = jest.fn(() => {
			throw new Error('any error');
		});

		const error = saveBookstores('any bookstores');

		expect(error).toBe('failed to save locally');
	});
});
