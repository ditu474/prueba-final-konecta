import React from 'react';

const BookstoreContext = React.createContext({
	addBookstore: (name) => {},
});

export default BookstoreContext;
