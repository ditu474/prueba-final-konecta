import Button from '@material-ui/core/Button';
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
		return 'El nombre sólo debe contener alfanuméricos';
	}
	return null;
};

const BookstoreForm = ({ onAddBookstore }) => {
	const validate = ({ name }) => {
		const errors = {};
		const nameError = nameValidator(name);
		if (nameError) {
			errors.name = nameError;
		}
		return errors;
	};

	const submitHandler = (values, { setSubmitting, resetForm }) => {
		onAddBookstore(values.name);
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
				<form name="NewBookstore" onSubmit={handleSubmit}>
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
