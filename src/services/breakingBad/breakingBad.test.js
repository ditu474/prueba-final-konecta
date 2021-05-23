import { getBreakingBadCharacters } from '.';

describe('Breaking Bad service', () => {
	afterEach(() => {
		jest.restoreAllMocks();
	});

	test('getCharacters should call fetch with correct values', async () => {
		const fetchSpy = jest.spyOn(global, 'fetch').mockResolvedValue({
			ok: true,
			json: jest.fn().mockResolvedValue([]),
		});

		await getBreakingBadCharacters();

		expect(fetchSpy).toHaveBeenCalledTimes(1);
		expect(fetchSpy).toHaveBeenCalledWith(
			'https://www.breakingbadapi.com/api/characters'
		);
	});

	test('if response is not ok should throw', async () => {
		jest.spyOn(global, 'fetch').mockResolvedValue({
			ok: false,
		});

		await expect(getBreakingBadCharacters()).rejects.toThrow(
			'Error fetching Breaking Bad characters'
		);
	});

	test('return the list of characters if fetch suceed', async () => {
		const mockResponse = [
			{
				char_id: 1,
				name: 'Walter White',
				birthday: '09-07-1958',
				occupation: ['High School Chemistry Teacher', 'Meth King Pin'],
				img: 'https://images.amcnetworks.com/amc.com/wp-content/uploads/2015/04/cast_bb_700x1000_walter-white-lg.jpg',
				status: 'Presumed dead',
				nickname: 'Heisenberg',
				appearance: [1, 2, 3, 4, 5],
				portrayed: 'Bryan Cranston',
				category: 'Breaking Bad',
				better_call_saul_appearance: [],
			},
		];
		jest.spyOn(global, 'fetch').mockResolvedValue({
			ok: true,
			json: jest.fn().mockResolvedValue(mockResponse),
		});

		const res = await getBreakingBadCharacters();

		expect(res).toEqual(mockResponse);
	});
});
