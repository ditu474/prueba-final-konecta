import { List } from '@material-ui/core';
import LoadingSpinner from 'components/LoadingSpinner';
import useHttp from 'hooks/use-http';
import PropTypes from 'prop-types';
import React from 'react';
import { getAuthorQuotes } from 'services/breakingBad';
import CharacterQuote from './CharacterQuote';

const CharacterQuotes = ({ characterName }) => {
	const { response, loading, error, sendRequest } = useHttp(getAuthorQuotes);
	let content;

	React.useEffect(() => {
		sendRequest({ author: characterName });
	}, [characterName, sendRequest]);

	if (loading) {
		content = <LoadingSpinner />;
	} else if (!response || response.length === 0) {
		content = <h3>No se encontraron frases para este personaje</h3>;
	} else if (error) {
		content = <h3>Ocurrió un error buscando las frases</h3>;
	} else {
		content = response.map((quote) => (
			<CharacterQuote key={quote['quote_id']} quote={quote} />
		));
	}

	return <List style={{ maxWidth: '350px', width: '100%' }}>{content}</List>;
};

CharacterQuotes.propTypes = {
	characterName: PropTypes.string.isRequired,
};

export default CharacterQuotes;
