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
});
