import { Route, Switch, useParams, useRouteMatch } from 'react-router-dom';

const Quote = () => {
	const { id } = useParams();
	const { path } = useRouteMatch();

	return (
		<>
			<div>Test Quote page {id} Details</div>
			<Switch>
				<Route path={`${path}/comments`} exact>
					<span>Comentarios</span>
				</Route>
				<Route path={`${path}/rate`} exact>
					<span>Calificaciones</span>
				</Route>
			</Switch>
		</>
	);
};

export default Quote;
