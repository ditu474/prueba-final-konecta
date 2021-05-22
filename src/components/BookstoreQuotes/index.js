import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import DeleteForever from '@material-ui/icons/DeleteForever';
import ImportExport from '@material-ui/icons/ImportExport';
import MenuButton from 'components/MenuButton';
import BookstoreCtx from 'context/bookstore';
import PropTypes from 'prop-types';
import React from 'react';

const useStyles = makeStyles((theme) => ({
	card: {
		width: '100%',
		margin: theme.spacing(1, 0),
	},
}));

const getMenuElements = (bookstores, moveQuoteFunc, quoteId, fromId) => {
	const filteredBookstores = bookstores.filter(
		(bookstore) => bookstore.id !== fromId
	);
	const names = filteredBookstores.map((bookstore) => {
		return {
			name: bookstore.name,
			action: () => {
				moveQuoteFunc(quoteId, fromId, bookstore.id);
			},
		};
	});
	return names;
};

const BookstoreQuotes = ({ quotes, bookstoreId }) => {
	const classes = useStyles();
	const { bookstores, deleteQuote, moveQuote } = React.useContext(BookstoreCtx);

	return (
		<>
			{quotes.map((quote) => (
				<Card key={quote.id} className={classes.card}>
					<CardContent>{quote.quote}</CardContent>
					<CardActions>
						<MenuButton
							elements={getMenuElements(
								bookstores,
								moveQuote,
								quote.id,
								bookstoreId
							)}
						>
							<IconButton aria-label="Move Quote" color="secondary">
								<ImportExport />
							</IconButton>
						</MenuButton>
						<IconButton
							aria-label="Delete Quote"
							color="primary"
							onClick={() => deleteQuote(quote.id, bookstoreId)}
						>
							<DeleteForever />
						</IconButton>
					</CardActions>
				</Card>
			))}
		</>
	);
};

BookstoreQuotes.propTypes = {
	quotes: PropTypes.array.isRequired,
	bookstoreId: PropTypes.number.isRequired,
};

export default BookstoreQuotes;
