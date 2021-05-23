import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';
import validator from 'validator';

const initialValues = {
	name: '',
};

const nameValidator = (name) => {
	if (!name) {
		return 'Debes ingresar un nombre';
	}
	if (!validator.isAlpha(name, 'es-ES', { ignore: ' -' })) {
		return 'Solo letras';
	}
	if (name.length > 15) {
		return 'Máximo 15 caracteres';
	}
	return null;
};

const useStyles = makeStyles((theme) => ({
	form: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'column',
		width: '100%',
		marginBottom: theme.spacing(2),
	},
	input: {
		marginBottom: theme.spacing(1),
	},
}));

const BookstoreForm = ({ onAddBookstore }) => {
	const classes = useStyles();

	const validate = ({ name }) => {
		const errors = {};
		const nameError = nameValidator(name);
		if (nameError) {
			errors.name = nameError;
		}
		return errors;
	};

	const submitHandler = (values, { setSubmitting, resetForm }) => {
		onAddBookstore(values.name.trim());
		setSubmitting(false);
		resetForm(initialValues);
	};

	return (
		<Formik
			initialValues={initialValues}
			validate={validate}
			onSubmit={submitHandler}
		>
			{({
				values,
				handleChange,
				handleBlur,
				handleSubmit,
				errors,
				touched,
				isSubmitting,
			}) => (
				<form
					name="NewBookstore"
					onSubmit={handleSubmit}
					className={classes.form}
				>
					<TextField
						variant="outlined"
						placeholder="Nombre de librería"
						type="text"
						name="name"
						id="name"
						onChange={handleChange}
						onBlur={handleBlur}
						value={values.name}
						error={!!errors.name && touched.name}
						helperText={!!errors.name && touched.name && errors.name}
						className={classes.input}
					/>
					<Button
						variant="contained"
						color="primary"
						disabled={isSubmitting}
						type="submit"
					>
						Crear
					</Button>
				</form>
			)}
		</Formik>
	);
};

BookstoreForm.propTypes = {
	onAddBookstore: PropTypes.func.isRequired,
};

export default BookstoreForm;
