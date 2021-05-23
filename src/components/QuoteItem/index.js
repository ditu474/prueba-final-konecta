import { Card, CardContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
	card: {
		width: 'fit-content',
		margin: '0 auto',
	},
	quote: {
		fontStyle: 'italic',
		fontSize: '1.2rem',
	},
	info: {
		display: 'flex',
		margin: theme.spacing(1, 0),
		alignItems: 'center',
	},
	h5: {
		fontWeight: 'normal',
		fontSize: '1rem',
		margin: theme.spacing(0, 1),
	},
}));

const QuoteItem = ({ quote }) => {
	const classes = useStyles();

	return (
		<Card variant="outlined" className={classes.card}>
			<CardContent>
				<em className={classes.quote}>"{quote.quote}"</em>
				<div className={classes.info}>
					<label>Author: </label>
					<h5 className={classes.h5}>{quote.author}</h5>
				</div>
				<div className={classes.info}>
					<label>Serie: </label>
					<h5 className={classes.h5}>{quote.series}</h5>
				</div>
			</CardContent>
		</Card>
	);
};

QuoteItem.propTypes = {
	quote: PropTypes.shape({
		quote: PropTypes.string.isRequired,
		author: PropTypes.string.isRequired,
		series: PropTypes.string.isRequired,
	}),
};

export default QuoteItem;
