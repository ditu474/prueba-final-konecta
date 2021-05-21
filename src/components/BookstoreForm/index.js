import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Formik } from 'formik';
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
	return '';
};

export default function BookstoreForm() {
	return (
		<Formik
			initialValues={initialValues}
			validate={(values) => {
				const errors = {};
				errors.name = nameValidator(values.name);
				return errors;
			}}
			onSubmit={(values, { setSubmitting }) => {
				console.log(values);
				setSubmitting(false);
			}}
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
						error={errors.name && touched.name}
						helperText={errors.name && touched.name && errors.name}
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
}
