import React from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';

const AdvanceFilters = React.lazy(() => import('components/AdvanceFilters'));
const Characters = React.lazy(() => import('components/Characters'));
const FilteredCharacters = React.lazy(() =>
	import('components/FilteredCharacters')
);

const Home = () => {
	const { path } = useRouteMatch();

	return (
		<div
			className="center-column-childs"
			style={{
				marginBottom: '2rem',
			}}
		>
			<AdvanceFilters />
			<Switch>
				<Route path={`${path}`} exact>
					<Characters />
				</Route>
				<Route path={`${path}/filtered`} exact>
					<FilteredCharacters />
				</Route>
				<Route path="*">
					<Redirect to="/characters" />
				</Route>
			</Switch>
		</div>
	);
};

export default Home;
