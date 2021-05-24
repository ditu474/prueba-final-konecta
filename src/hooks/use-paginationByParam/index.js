import queryString from 'query-string';
import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';

const usePaginationByParam = () => {
	const [currentPage, setCurrentPage] = React.useState(null);
	const location = useLocation();
	const history = useHistory();

	const goToPage = React.useCallback(
		(page) => {
			const queryParsed = queryString.parse(location.search);
			queryParsed.page = page;
			history.push({
				search: queryString.stringify(queryParsed),
			});
		},
		[location.search, history]
	);

	React.useEffect(() => {
		const page = queryString.parse(location.search)['page'];
		if (!!page) {
			const pageNumber = Number(page);
			if (!!pageNumber && pageNumber > 0) {
				setCurrentPage(pageNumber);
				return;
			}
		}
		goToPage(1);
	}, [goToPage, location.search]);

	const goToNextPage = () => {
		goToPage(currentPage + 1);
	};

	const goToPrevPage = () => {
		goToPage(currentPage - 1);
	};

	return {
		currentPage,
		goToNextPage,
		goToPrevPage,
		goToPage,
	};
};

export default usePaginationByParam;
