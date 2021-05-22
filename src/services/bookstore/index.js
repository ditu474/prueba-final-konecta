const BOOKSTORES_KEY = 'bookstores';

export const getSavedBookstores = () => {
	const savedBookstores = localStorage.getItem(BOOKSTORES_KEY);
	if (!savedBookstores) {
		return [];
	}
	return JSON.parse(savedBookstores);
};

export const saveBookstores = (bookstores) => {
	try {
		localStorage.setItem(BOOKSTORES_KEY, JSON.stringify(bookstores));
	} catch {
		return 'failed to save locally';
	}
};
