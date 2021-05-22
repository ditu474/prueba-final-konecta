import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import BookstoreQuotes from 'components/BookstoreQuotes';
import PropTypes from 'prop-types';
import React from 'react';

const Bookstores = ({ bookstores }) => {
	return (
		<>
			{bookstores.map((bookstore) => (
				<Accordion key={bookstore.id}>
					<AccordionSummary
						expandIcon={<ExpandMoreIcon />}
						aria-label="Abrir librería"
					>
						{bookstore.name}
					</AccordionSummary>
					<AccordionDetails>
						<BookstoreQuotes quotes={bookstore.quotes} />
					</AccordionDetails>
				</Accordion>
			))}
		</>
	);
};

Bookstores.propTypes = {
	bookstores: PropTypes.array.isRequired,
};

export default Bookstores;
