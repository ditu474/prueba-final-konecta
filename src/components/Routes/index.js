import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const Bookstore = React.lazy(() => import('pages/Bookstore'));
const Home = React.lazy(() => import('pages/Home'));

export default function Routes() {
	return (
		<Switch>
			<Route path="/bookstores" exact>
				<Bookstore />
			</Route>
			<Route path="/characters">
				<Home />
			</Route>
			<Route path="*">
				<Redirect to="/characters" />
			</Route>
		</Switch>
	);
}
