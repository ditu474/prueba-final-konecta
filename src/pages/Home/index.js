import React from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';

const Characters = React.lazy(() => import('components/Characters'));

const Home = () => {
	let { path } = useRouteMatch();

	return (
		<>
			<button>Filtros Avanzados</button>
			<Switch>
				<Route path={`${path}`} exact>
					<Characters />
				</Route>
				<Route path={`${path}/filtered`} exact>
					<div>Filtered Characters</div>
				</Route>
				<Route path="*">
					<Redirect to="/characters" />
				</Route>
			</Switch>
		</>
	);
};

export default Home;
