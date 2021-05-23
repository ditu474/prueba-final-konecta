const BASE_URL = 'https://www.breakingbadapi.com/api';

export const getBreakingBadCharacters = async () => {
	const url = `${BASE_URL}/characters`;
	return fetch(url).then((res) => {
		if (res.ok) return res.json();
		throw new Error('Error fetching Breaking Bad characters');
	});
};

export const getCharactersFiltered = async ({ limit, offset }) => {
	const url = `${BASE_URL}/characters?limit=${limit}&offset=${offset}`;
	return fetch(url).then((res) => {
		if (res.ok) return res.json();
		throw new Error('Error fetching Breaking Bad characters');
	});
};
