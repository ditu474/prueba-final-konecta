export const getSavedBookstores = () => {
	const savedBookstores = localStorage.getItem('bookstores');
	if (!savedBookstores) {
		return [];
	}
	return JSON.parse(savedBookstores);
};
