import React from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';

const Characters = React.lazy(() => import('components/Characters'));

const Home = () => {
	const { path } = useRouteMatch();

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				marginBottom: '2rem',
			}}
		>
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
		</div>
	);
};

export default Home;
