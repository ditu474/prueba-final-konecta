import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const Bookstore = React.lazy(() => import('pages/Bookstore'));
const Home = React.lazy(() => import('pages/Home'));
const Quote = React.lazy(() => import('pages/Quote'));

export default function Routes() {
	return (
		<Switch>
			<Route path="/bookstores" exact>
				<Bookstore />
			</Route>
			<Route path="/characters">
				<Home />
			</Route>
			<Route path="/quote/:id">
				<Quote />
			</Route>
			<Route path="*">
				<Redirect to="/characters" />
			</Route>
		</Switch>
	);
}
