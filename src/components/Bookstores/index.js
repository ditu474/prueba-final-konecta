import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import DeleteForever from '@material-ui/icons/DeleteForever';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PropTypes from 'prop-types';
import React from 'react';
import BookstoreQuotes from './BookstoreQuotes';

const useStyles = makeStyles((theme) => ({
	details: {
		display: 'flex',
		flexDirection: 'column',
	},
	summary: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		width: '100%',
	},
	root: {
		margin: theme.spacing(2),
	},
}));

const Bookstores = ({ bookstores, onBookstoreDelete }) => {
	const deleteBookstoreHandler = (id) => () => {
		onBookstoreDelete(id);
	};

	const classes = useStyles();

	return (
		<div className={classes.root}>
			{bookstores.map((bookstore) => (
				<Accordion key={bookstore.id}>
					<AccordionSummary
						expandIcon={<ExpandMoreIcon />}
						aria-label="Open bookstore"
					>
						<div className={classes.summary}>
							<h4>{bookstore.name}</h4>
							<IconButton
								aria-label="Delete bookstore"
								color="primary"
								onClick={deleteBookstoreHandler(bookstore.id)}
							>
								<DeleteForever />
							</IconButton>
						</div>
					</AccordionSummary>
					<AccordionDetails className={classes.details}>
						<BookstoreQuotes
							quotes={bookstore.quotes}
							bookstoreId={bookstore.id}
						/>
					</AccordionDetails>
				</Accordion>
			))}
		</div>
	);
};

Bookstores.propTypes = {
	bookstores: PropTypes.array.isRequired,
	onBookstoreDelete: PropTypes.func.isRequired,
};

export default Bookstores;
