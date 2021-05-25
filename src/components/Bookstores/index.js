import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	IconButton,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { DeleteForever, ExpandMore } from '@material-ui/icons';
import PropTypes from 'prop-types';
import React from 'react';
import Swal from 'sweetalert2';
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
		textAlign: 'center',
	},
}));

const Bookstores = ({ bookstores, onBookstoreDelete }) => {
	const deleteBookstoreHandler = (id) => () => {
		Swal.fire({
			title: 'Seguro que quieres eliminar la librería?',
			showCancelButton: true,
			confirmButtonText: 'Confirmar',
			cancelButtonText: 'Cancelar',
			confirmButtonColor: '#388e3c',
		}).then((result) => {
			if (result.isConfirmed) {
				onBookstoreDelete(id);
			}
		});
	};

	const classes = useStyles();

	return (
		<div className={classes.root}>
			{bookstores.length === 0 && (
				<h3>No tienes librerías, crea la primera.</h3>
			)}

			{bookstores.length > 0 &&
				bookstores.map((bookstore) => (
					<Accordion key={bookstore.id}>
						<AccordionSummary
							expandIcon={<ExpandMore />}
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
