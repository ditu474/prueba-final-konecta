import LoadingSpinner from 'components/LoadingSpinner';
import QuoteItem from 'components/QuoteItem';
import useHtpp from 'hooks/use-http';
import React from 'react';
import { Route, Switch, useParams, useRouteMatch } from 'react-router-dom';
import { getQuoteById } from 'services/breakingBad';

const Quote = () => {
	const { id } = useParams();
	const { path } = useRouteMatch();
	const { response, loading, error, sendRequest } = useHtpp(getQuoteById);

	React.useEffect(() => {
		sendRequest({ quoteId: id });
	}, [id, sendRequest]);

	if (loading) {
		return <LoadingSpinner />;
	} else if (error || !response || response.length === 0) {
		return <h4>No se logró encontrar la información de la frase {id}</h4>;
	}

	return (
		<>
			<QuoteItem quote={response[0]} />
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
