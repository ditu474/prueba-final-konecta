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

export const getAuthorQuotes = async ({ author }) => {
	const authorFix = author.trim().replace(' ', '+');
	const url = `${BASE_URL}/quote?author=${authorFix}`;
	return fetch(url).then((res) => {
		if (res.ok) return res.json();
		throw new Error(`Error fetching quotes for ${author}`);
	});
};

export const getQuoteById = async ({ quoteId }) => {
	const url = `${BASE_URL}/quotes/${quoteId}`;
	return fetch(url).then((res) => {
		if (res.ok) return res.json();
		throw new Error(`Error fetching quote with ID: ${quoteId}`);
	});
};
