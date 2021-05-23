import BookstoreCtx from 'context/bookstore';
import PropTypes from 'prop-types';
import React from 'react';
import BookstoreQuote from './BookstoreQuote';

const moveMenuElements = (bookstores, moveQuoteFunc, quoteId, fromId) => {
	const filteredBookstores = bookstores.filter(
		(bookstore) => bookstore.id !== fromId
	);
	const elements = filteredBookstores.map((bookstore) => {
		return {
			name: bookstore.name,
			action: () => {
				moveQuoteFunc(quoteId, fromId, bookstore.id);
			},
		};
	});
	return elements;
};

const BookstoreQuotes = ({ quotes, bookstoreId }) => {
	const { bookstores, deleteQuote, moveQuote } = React.useContext(BookstoreCtx);

	const deleteQuoteHandler = (quoteId) => deleteQuote(quoteId, bookstoreId);

	const getMoveMenuElements = (quoteId) =>
		moveMenuElements(bookstores, moveQuote, quoteId, bookstoreId);

	return quotes.map((quote) => (
		<BookstoreQuote
			key={quote.id}
			quote={quote}
			onDeleteQuote={() => deleteQuoteHandler(quote.id)}
			moveMenuElements={getMoveMenuElements(quote.id)}
		/>
	));
};

BookstoreQuotes.propTypes = {
	quotes: PropTypes.array.isRequired,
	bookstoreId: PropTypes.number.isRequired,
};

export default React.memo(BookstoreQuotes);
