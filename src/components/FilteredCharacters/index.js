import { Button } from '@material-ui/core';
import queryString from 'query-string';
import React from 'react';
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';

const FilteredCharacters = () => {
	const history = useHistory();
	const { path } = useRouteMatch();
	const location = useLocation();
	const [query, setQuery] = React.useState({});

	React.useEffect(() => {
		setQuery(queryString.parse(location.search));
	}, [location.search]);

	const backToMainHandler = () => {
		history.push({
			pathname: `${path}/characters`,
		});
	};

	return (
		<div style={{ margin: '1rem 0' }}>
			<Button variant="contained" color="primary" onClick={backToMainHandler}>
				Limpiar busqueda
			</Button>
			<ul>
				{Object.keys(query).map((key) => (
					<li key={key}>
						{key}: {query[key]}
					</li>
				))}
			</ul>
		</div>
	);
};

export default FilteredCharacters;
