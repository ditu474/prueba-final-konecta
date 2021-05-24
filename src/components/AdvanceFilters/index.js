import { Button } from '@material-ui/core';
import LoadingSpinner from 'components/LoadingSpinner';
import { useSnackbar } from 'notistack';
import React from 'react';

const FiltersForm = React.lazy(() => import('./FiltersForm'));

const AdvanceFilters = () => {
	const [displayFilters, setDisplayFilters] = React.useState(false);
	const { enqueueSnackbar } = useSnackbar();

	const openFiltersHandler = () => {
		setDisplayFilters(true);
	};

	const closeFiltersHandler = () => {
		setDisplayFilters(false);
	};

	const handleSearch = (searchQuery) => {
		if (Object.keys(searchQuery).length === 0) {
			enqueueSnackbar('El formulario está vacío', { variant: 'error' });
			return;
		}
		console.log(searchQuery);
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
