import React from 'react';

const BookstoreContext = React.createContext({
	bookstores: [],
	addBookstore: (name) => {},
	addQuote: (quote, bookstoreId) => {},
	moveQuote: (quoteId, fromId, toId) => {},
});

export default BookstoreContext;
