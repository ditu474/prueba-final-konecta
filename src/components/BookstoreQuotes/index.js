import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import DeleteForever from '@material-ui/icons/DeleteForever';
import ImportExport from '@material-ui/icons/ImportExport';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
	card: {
		width: '100%',
		margin: theme.spacing(1, 0),
	},
}));

const BookstoreQuotes = ({ quotes }) => {
	const classes = useStyles();
	return (
		<>
			{quotes.map((quote) => (
				<Card key={quote.id} className={classes.card}>
					<CardContent>{quote.quote}</CardContent>
					<CardActions>
						<IconButton aria-label="Move Quote" color="secondary">
							<ImportExport />
						</IconButton>
						<IconButton aria-label="Delete Quote" color="primary">
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
};

export default BookstoreQuotes;
