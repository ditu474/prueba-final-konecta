import LoadingSpinner from 'components/LoadingSpinner';
import QuoteComments from 'components/QuoteComments';
import QuoteItem from 'components/QuoteItem';
import QuoteRates from 'components/QuoteRates';
import useHtpp from 'hooks/use-http';
import React from 'react';
import { Route, Switch, useParams, useRouteMatch } from 'react-router-dom';
import { getQuoteById } from 'services/breakingBad';

const Quote = () => {
	const { id } = useParams();
	const QuoteId = +id;
	const { path } = useRouteMatch();
	const { response, loading, error, sendRequest } = useHtpp(getQuoteById);

	React.useEffect(() => {
		sendRequest({ quoteId: QuoteId });
	}, [QuoteId, sendRequest]);

	if (loading) {
		return <LoadingSpinner />;
	} else if (error || !response || response.length === 0) {
		return <h4>No se logró encontrar la información de la frase {QuoteId}</h4>;
	}

	return (
		<div className="center-column-childs">
			<QuoteItem quote={response[0]} />
			<Switch>
				<Route path={`${path}/comments`} exact>
					<QuoteComments quoteId={QuoteId} />
				</Route>
				<Route path={`${path}/rate`} exact>
					<QuoteRates quoteId={QuoteId} />
				</Route>
			</Switch>
		</div>
	);
};

export default Quote;
