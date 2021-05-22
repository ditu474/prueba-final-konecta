import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import PropTypes from 'prop-types';

const BookstoreQuotes = ({ quotes }) => {
	return (
		<>
			{quotes.map((quote) => (
				<Card key={quote.id}>
					<CardContent>{quote.quote}</CardContent>
					<CardActions></CardActions>
				</Card>
			))}
		</>
	);
};

BookstoreQuotes.propTypes = {
	quotes: PropTypes.array.isRequired,
};

export default BookstoreQuotes;
