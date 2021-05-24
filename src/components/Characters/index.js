import CharactersList from 'components/CharactersList';
import LoadingSpinner from 'components/LoadingSpinner';
import Paginator from 'components/Paginator';
import usePaginationHttp from 'hooks/use-paginationHttp';
import { getCharactersFiltered } from 'services/breakingBad';

const MAX_ELEMENTS_PER_PAGE = 5;

const Characters = () => {
	const { currentPage, goToNextPage, goToPrevPage, filteredItems, loading } =
		usePaginationHttp(getCharactersFiltered, MAX_ELEMENTS_PER_PAGE);

	if (loading) {
		return <LoadingSpinner />;
	}

	if (currentPage === 1 && filteredItems.length === 0) {
		return (
			<h4>
				No hay personajes para mostrar, posiblemente no tienes conexión a
				internet
			</h4>
		);
	}

	return (
		<Paginator
			onBackPage={goToPrevPage}
			onNextPage={goToNextPage}
			currentPage={currentPage || 1}
			nextPageDisable={filteredItems.length < MAX_ELEMENTS_PER_PAGE}
		>
			<CharactersList characters={filteredItems} />
		</Paginator>
	);
};

export default Characters;
