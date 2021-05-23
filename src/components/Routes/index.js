import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const Bookstore = React.lazy(() => import('pages/Bookstore'));

export default function Routes() {
	return (
		<Switch>
			<Route path="/bookstores" exact>
				<Bookstore />
			</Route>
			<Route path="/" exact>
				<div>Test</div>
			</Route>
			<Route path="*">
				<Redirect to="/" />
			</Route>
		</Switch>
	);
}
