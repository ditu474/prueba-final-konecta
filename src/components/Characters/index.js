import IconButton from '@material-ui/core/IconButton';
import { ArrowBack, ArrowForward } from '@material-ui/icons';
import LoadingSpinner from 'components/LoadingSpinner';
import usePaginationHttp from 'hooks/use-paginationHttp';
import { getCharactersFiltered } from 'services/breakingBad';
import styles from './Characters.module.scss';

const MAX_ELEMENTS_PER_PAGE = '5';

const Characters = () => {
	const { currentPage, goToNextPage, goToPrevPage, filteredItems, loading } =
		usePaginationHttp(getCharactersFiltered, MAX_ELEMENTS_PER_PAGE);

	if (loading) {
		return <LoadingSpinner />;
	}

	if (currentPage === 1 && filteredItems.length === 0) {
		return (
			<h4>No hay personajes para mostrar, posiblemente no tienes internet</h4>
		);
	}

	return (
		<>
			<ul>
				{filteredItems.map((character) => (
					<li key={character['char_id']}>{character.name}</li>
				))}
			</ul>
			<div className={styles.actions}>
				<IconButton
					aria-label="Previous page"
					onClick={goToPrevPage}
					disabled={currentPage < 2}
				>
					<ArrowBack />
				</IconButton>
				<span arial-label="Page number">{currentPage}</span>
				<IconButton
					aria-label="Next page"
					onClick={goToNextPage}
					disabled={filteredItems.length < MAX_ELEMENTS_PER_PAGE}
				>
					<ArrowForward />
				</IconButton>
			</div>
		</>
	);
};

export default Characters;
