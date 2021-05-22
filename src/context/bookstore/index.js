import React from 'react';

const BookstoreContext = React.createContext({
	bookstores: [],
	addBookstore: (name) => {},
	addQuote: (quote, bookstoreId) => {},
	moveQuote: (quoteId, fromId, toId) => {},
	deleteBookstore: (bookstoreId) => {},
	deleteQuote: (quoteId, bookstoreId) => {},
});

export default BookstoreContext;
