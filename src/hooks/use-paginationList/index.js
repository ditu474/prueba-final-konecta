import usePaginationByParam from 'hooks/use-paginationByParam';

const usePaginationList = (list, maxElementsPerPage) => {
	const { currentPage, goToNextPage, goToPrevPage } = usePaginationByParam();

	const listFiltered = list.slice(
		(currentPage - 1) * maxElementsPerPage,
		currentPage * maxElementsPerPage
	);

	const nextPageExists = currentPage * maxElementsPerPage >= list.length;

	return {
		currentPage,
		goToNextPage,
		goToPrevPage,
		listFiltered,
		nextPageExists,
	};
};

export default usePaginationList;
