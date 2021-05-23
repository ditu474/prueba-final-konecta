import IconButton from '@material-ui/core/IconButton';
import { ArrowBack, ArrowForward } from '@material-ui/icons';
import CharacterItem from 'components/CharacterItem';
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
			<h4>
				No hay personajes para mostrar, posiblemente no tienes conexión a
				internet
			</h4>
		);
	}

	return (
		<>
			<ul className={styles.list}>
				{filteredItems.map((character) => (
					<CharacterItem key={character['char_id']} character={character} />
				))}
			</ul>
			<div className={styles.actions}>
				<IconButton
					aria-label="Previous page"
					onClick={goToPrevPage}
					disabled={currentPage < 2}
					color="secondary"
				>
					<ArrowBack />
				</IconButton>
				<span arial-label="Page number">{currentPage}</span>
				<IconButton
					aria-label="Next page"
					onClick={goToNextPage}
					disabled={filteredItems.length < MAX_ELEMENTS_PER_PAGE}
					color="secondary"
				>
					<ArrowForward />
				</IconButton>
			</div>
		</>
	);
};

export default Characters;
