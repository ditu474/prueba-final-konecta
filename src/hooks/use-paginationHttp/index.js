import useHttp from 'hooks/use-http';
import { useSnackbar } from 'notistack';
import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';

const usePaginationHttp = (apiCall, maxElementsPerPage) => {
	const [currentPage, setCurrentPage] = React.useState(null);
	const { response, loading, error, sendRequest } = useHttp(apiCall);
	const { enqueueSnackbar } = useSnackbar();
	const history = useHistory();
	const location = useLocation();

	React.useEffect(() => {
		const page = new URLSearchParams(location.search).get('page');
		const pageNumber = +page;
		if (pageNumber && pageNumber > 0) {
			setCurrentPage(pageNumber);
		} else {
			history.push({
				search: `?page=1`,
			});
		}
	}, [history, location.search]);

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
			history.push({
				search: `?page=1`,
			});
		}
	}, [response, history]);

	const goToNextPage = () => {
		const nextPage = currentPage + 1;
		history.push({
			search: `?page=${nextPage}`,
		});
	};

	const goToPrevPage = () => {
		const nextPage = currentPage - 1;
		history.push({
			search: `?page=${nextPage}`,
		});
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
