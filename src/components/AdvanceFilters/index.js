import { Button } from '@material-ui/core';
import LoadingSpinner from 'components/LoadingSpinner';
import { useSnackbar } from 'notistack';
import React from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';

const FiltersForm = React.lazy(() => import('./FiltersForm'));

const AdvanceFilters = () => {
	const [displayFilters, setDisplayFilters] = React.useState(false);
	const { enqueueSnackbar } = useSnackbar();
	const history = useHistory();
	const { path } = useRouteMatch();

	const openFiltersHandler = () => {
		setDisplayFilters(true);
	};

	const closeFiltersHandler = () => {
		setDisplayFilters(false);
	};

	const handleSearch = (searchQuery) => {
		const queryKeys = Object.keys(searchQuery);
		if (queryKeys.length === 0) {
			enqueueSnackbar('El formulario está vacío', { variant: 'error' });
			return;
		}
		let searchURL = '?';
		queryKeys.forEach((key) => {
			if (searchURL !== '?') searchURL += '&';
			searchURL += `${key}=${searchQuery[key]}`;
		});
		history.push({
			pathname: `${path}/filtered`,
			search: searchURL,
		});
	};

	return (
		// Evitar que los personajes desaparezcan al cargar el filtro
		// Solo mostrar el spinner en la parte superior
		<React.Suspense fallback={<LoadingSpinner></LoadingSpinner>}>
			{!displayFilters && (
				<Button
					variant="contained"
					color="primary"
					onClick={openFiltersHandler}
				>
					Filtros Avanzados
				</Button>
			)}
			{displayFilters && (
				<FiltersForm
					onCloseFilters={closeFiltersHandler}
					onSearch={handleSearch}
				/>
			)}
		</React.Suspense>
	);
};

export default AdvanceFilters;
