import { getSavedBookstores } from '.';

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

describe('Bookstore Service', () => {
	test('return bookstores saved locally', () => {
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
});
