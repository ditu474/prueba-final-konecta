import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Formik } from 'formik';
import React from 'react';

export default function Bookstore() {
	return (
		<>
			<Formik
				initialValues={{ name: '' }}
				validate={(values) => {
					const errors = {};
					if (!values.name) {
						errors.name = 'Debes ingresar un nombre';
					}
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
							error={!!errors.name}
							helperText={errors.name || null}
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
		</>
	);
}
