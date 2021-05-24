import { Button } from '@material-ui/core';
import CharactersList from 'components/CharactersList';
import LoadingSpinenr from 'components/LoadingSpinner';
import Paginator from 'components/Paginator';
import useHttp from 'hooks/use-http';
import usePaginationList from 'hooks/use-paginationList';
import queryString from 'query-string';
import React from 'react';
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import { getBreakingBadCharacters } from 'services/breakingBad';
import filterCharacters from './filterCharacters';

const MAX_ELEMENTS_PER_PAGE = 5;

const FilteredCharacters = () => {
	const [filteredCharacters, setFilteredCharacters] = React.useState([]);
	const {
		response: characters,
		loading,
		sendRequest,
	} = useHttp(getBreakingBadCharacters);
	const {
		listFiltered: listToDisplay,
		goToNextPage,
		currentPage,
		goToPrevPage,
		nextPageExists,
	} = usePaginationList(filteredCharacters, MAX_ELEMENTS_PER_PAGE);
	const history = useHistory();
	const { path } = useRouteMatch();
	const location = useLocation();

	React.useEffect(() => {
		sendRequest();
		//eslint-disable-next-line
	}, []);

	React.useEffect(() => {
		if (!!characters && characters.length > 0) {
			const queryParsed = queryString.parse(location.search);
			setFilteredCharacters(filterCharacters(characters, queryParsed));
		}
	}, [location.search, characters]);

	const backToHomeHandler = () => {
		history.push({
			pathname: `${path}/characters`,
		});
	};

	const changePageHandler = (direction) => () => {
		window.scroll({
			top: document.body,
			left: 0,
			behavior: 'smooth',
		});

		if (direction === 'next') goToNextPage();
		if (direction === 'back') goToPrevPage();
	};

	let content;
	if (loading) content = <LoadingSpinenr />;
	if (!!listToDisplay && listToDisplay.length > 0)
		content = (
			<Paginator
				onBackPage={changePageHandler('back')}
				onNextPage={changePageHandler('next')}
				currentPage={currentPage || 1}
				nextPageDisable={nextPageExists}
			>
				<CharactersList characters={listToDisplay} />
			</Paginator>
		);
	else content = <h3>No se han encontrado resultados</h3>;

	return (
		<div style={{ margin: '1rem 0' }} className="center-column-childs">
			<Button variant="contained" color="primary" onClick={backToHomeHandler}>
				Limpiar busqueda
			</Button>
			{content}
		</div>
	);
};

export default FilteredCharacters;
