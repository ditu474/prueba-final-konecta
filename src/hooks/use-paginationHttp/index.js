import useHttp from 'hooks/use-http';
import usePaginationByParam from 'hooks/use-paginationByParam';
import { useSnackbar } from 'notistack';
import React from 'react';

const usePaginationHttp = (apiCall, maxElementsPerPage) => {
	const { response, loading, error, sendRequest } = useHttp(apiCall);
	const { currentPage, goToNextPage, goToPrevPage, goToPage } =
		usePaginationByParam();
	const { enqueueSnackbar } = useSnackbar();

	React.useEffect(() => {
		if (currentPage && currentPage > 0) {
			sendRequest({
				limit: maxElementsPerPage,
				offset: (currentPage - 1) * maxElementsPerPage,
			});
		}
	}, [currentPage, maxElementsPerPage, sendRequest]);

	React.useEffect(() => {
		if (error) {
			enqueueSnackbar('Error al solicitar los personajes', {
				variant: 'error',
			});
		}
	}, [error, enqueueSnackbar]);

	React.useEffect(() => {
		if (response && response.length === 0) {
			goToPage(1);
		}
	}, [goToPage, response]);

	const filteredItems = response || [];

	return {
		currentPage,
		goToNextPage,
		goToPrevPage,
		filteredItems,
		loading,
	};
};

export default usePaginationHttp;
