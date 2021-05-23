import LoadingSpinner from 'components/LoadingSpinner';
import useHttp from 'hooks/use-http';
import PropTypes from 'prop-types';
import React from 'react';
import { getAuthorQuotes } from 'services/breakingBad';
import Quote from './Quote';

const CharacterQuotes = ({ characterName }) => {
	const { response, loading, error, sendRequest } = useHttp(getAuthorQuotes);

	React.useEffect(() => {
		sendRequest({ author: characterName });
	}, [characterName, sendRequest]);

	if (loading) {
		return <LoadingSpinner />;
	}

	if (!response || response.length === 0) {
		return <h3>No se encontraron frases para este personaje</h3>;
	}

	if (error) {
		return <h3>Ocurrió un error buscando las frases</h3>;
	}

	return (
		<>
			{response.map((quote) => (
				<Quote key={quote['quote_id']} quote={quote} />
			))}
		</>
	);
};

CharacterQuotes.propTypes = {
	characterName: PropTypes.string.isRequired,
};

export default CharacterQuotes;
