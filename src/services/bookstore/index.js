import { getSavedResource } from 'services/localStorage';

const BOOKSTORES_KEY = 'bookstores';

export const getSavedBookstores = () => getSavedResource(BOOKSTORES_KEY);

export const saveBookstores = (bookstores) => {
	try {
		localStorage.setItem(BOOKSTORES_KEY, JSON.stringify(bookstores));
	} catch {
		return 'failed to save locally';
	}
};
