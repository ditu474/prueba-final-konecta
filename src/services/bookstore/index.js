export const getSavedBookstores = () => {
	const savedBookstores = localStorage.getItem('bookstores');
	return JSON.parse(savedBookstores);
};
