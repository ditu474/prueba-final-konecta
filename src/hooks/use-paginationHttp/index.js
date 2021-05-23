import useHttp from 'hooks/use-http';
import { useSnackbar } from 'notistack';
import React from 'react';

const usePaginationHttp = (apiCall, maxElementsPerPage) => {
	const [currentPage, setCurrentPage] = React.useState(1);
	const { response, loading, error, sendRequest } = useHttp(apiCall);
	const { enqueueSnackbar } = useSnackbar();

	React.useEffect(() => {
		sendRequest({
			limit: maxElementsPerPage,
			offset: currentPage - 1 * maxElementsPerPage,
		});
	}, [currentPage, maxElementsPerPage, sendRequest]);

	React.useEffect(() => {
		if (error) {
			enqueueSnackbar('Error al solicitar los personajes', {
				variant: 'error',
			});
		}
	}, [error, enqueueSnackbar]);

	const goToNextPage = () => {
		setCurrentPage((prevPage) => prevPage + 1);
	};

	const goToPrevPage = () => {
		setCurrentPage((prevPage) => prevPage - 1);
	};

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
