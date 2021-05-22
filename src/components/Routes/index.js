import React from 'react';
import { Route, Switch } from 'react-router-dom';

const Bookstore = React.lazy(() => import('pages/Bookstore'));

export default function Routes() {
	return (
		<Switch>
			<Route path="/bookstores">
				<Bookstore />
			</Route>
			<Route path="/" exact>
				<div>Test</div>
			</Route>
		</Switch>
	);
}
