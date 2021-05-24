import { Button } from '@material-ui/core';
import LoadingSpinenr from 'components/LoadingSpinner';
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
	const { listFiltered: listToDisplay } = usePaginationList(
		filteredCharacters,
		MAX_ELEMENTS_PER_PAGE
	);
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

	const backToMainHandler = () => {
		history.push({
			pathname: `${path}/characters`,
		});
	};

	let content;
	if (loading) content = <LoadingSpinenr />;
	else
		content = (
			<ul>
				{listToDisplay.map((character) => (
					<li key={character.id}>
						{character.name}: {character.birthday}
					</li>
				))}
			</ul>
		);

	return (
		<div style={{ margin: '1rem 0' }} className="center-column-childs">
			<Button variant="contained" color="primary" onClick={backToMainHandler}>
				Limpiar busqueda
			</Button>
			{content}
		</div>
	);
};

export default FilteredCharacters;
