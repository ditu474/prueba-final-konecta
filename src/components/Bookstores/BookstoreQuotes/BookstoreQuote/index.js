import { Card, CardActions, CardContent, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { DeleteForever, ImportExport } from '@material-ui/icons';
import MenuButton from 'components/MenuButton';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
	card: {
		width: '100%',
		margin: theme.spacing(1, 0),
	},
}));

const BookstoreQuote = ({ quote, moveMenuElements, onDeleteQuote }) => {
	const classes = useStyles();

	return (
		<Card key={quote.id} className={classes.card}>
			<CardContent>{quote.quote}</CardContent>
			<CardActions>
				<MenuButton elements={moveMenuElements}>
					<IconButton aria-label="Move Quote" color="secondary">
						<ImportExport />
					</IconButton>
				</MenuButton>
				<IconButton
					aria-label="Delete Quote"
					color="primary"
					onClick={onDeleteQuote}
				>
					<DeleteForever />
				</IconButton>
			</CardActions>
		</Card>
	);
};

BookstoreQuote.propTypes = {
	quote: PropTypes.shape({
		id: PropTypes.number.isRequired,
		quote: PropTypes.string.isRequired,
	}),
	moveMenuElements: PropTypes.array.isRequired,
	onDeleteQuote: PropTypes.func.isRequired,
};

export default BookstoreQuote;
