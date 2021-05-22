import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PropTypes from 'prop-types';
import React from 'react';

const Bookstores = ({ bookstores }) => {
	return (
		<>
			{bookstores.map((bookstore) => (
				<Accordion key={bookstore.id}>
					<AccordionSummary
						expandIcon={<ExpandMoreIcon />}
						aria-controls="panel1a-content"
						id="panel1a-header"
					>
						{bookstore.name}
					</AccordionSummary>
					<AccordionDetails></AccordionDetails>
				</Accordion>
			))}
		</>
	);
};

Bookstores.propTypes = {
	bookstores: PropTypes.array.isRequired,
};

export default Bookstores;
