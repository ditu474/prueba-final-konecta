import usePaginationByParam from 'hooks/use-paginationByParam';

const usePaginationList = (list, maxElementsPerPage) => {
	const { currentPage, goToNextPage, goToPrevPage } = usePaginationByParam();

	const listFiltered = list.slice(
		(currentPage - 1) * maxElementsPerPage,
		currentPage * maxElementsPerPage
	);

	return {
		currentPage,
		goToNextPage,
		goToPrevPage,
		listFiltered,
	};
};

export default usePaginationList;
