import { Button, TextField } from '@material-ui/core';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import styles from './FiltersForm.module.scss';
import { initialValues, submitHandler, validateForm } from './formUtils';

const FiltersForm = ({ onSearch, onCloseFilters }) => {
	return (
		<>
			<Formik
				initialValues={initialValues}
				validate={validateForm}
				onSubmit={submitHandler(onSearch)}
			>
				{({
					values,
					handleChange,
					handleBlur,
					handleSubmit,
					errors,
					touched,
					isSubmitting,
					resetForm,
				}) => (
					<form
						name="NewBookstore"
						onSubmit={handleSubmit}
						className="center-column-childs"
						style={{ gap: '1rem' }}
						autoComplete="off"
					>
						<div className={styles['center-row']}>
							<TextField
								variant="outlined"
								label="Nombre personaje"
								type="text"
								name="name"
								id="name"
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.name}
								error={!!errors.name && touched.name}
								helperText={!!errors.name && touched.name && errors.name}
							/>
							<TextField
								variant="outlined"
								label="Fecha de nacimiento"
								InputLabelProps={{
									shrink: true,
								}}
								type="date"
								name="birthday"
								id="birthday"
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.birthday}
								error={!!errors.birthday && touched.birthday}
								helperText={
									!!errors.birthday && touched.birthday && errors.birthday
								}
							/>
							<TextField
								variant="outlined"
								label="Ocupación del personaje"
								type="text"
								name="occupation"
								id="occupation"
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.occupation}
								error={!!errors.occupation && touched.occupation}
								helperText={
									!!errors.occupation && touched.occupation && errors.occupation
								}
							/>
							<TextField
								variant="outlined"
								label="Estado del personaje"
								type="text"
								name="status"
								id="status"
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.status}
								error={!!errors.status && touched.status}
								helperText={!!errors.status && touched.status && errors.status}
							/>
							<TextField
								variant="outlined"
								label="Apodo del personaje"
								type="text"
								name="nickname"
								id="nickname"
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.nickname}
								error={!!errors.nickname && touched.nickname}
								helperText={
									!!errors.nickname && touched.nickname && errors.nickname
								}
							/>
							<TextField
								variant="outlined"
								label="Protagonista"
								type="text"
								name="portrayed"
								id="portrayed"
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.portrayed}
								error={!!errors.portrayed && touched.portrayed}
								helperText={
									!!errors.portrayed && touched.portrayed && errors.portrayed
								}
							/>
						</div>
						<div className={styles['center-row']}>
							<Button
								variant="contained"
								color="secondary"
								disabled={isSubmitting}
								type="submit"
							>
								Buscar
							</Button>
							<Button
								variant="contained"
								color="primary"
								onClick={() => resetForm(initialValues)}
							>
								Limpiar filtros
							</Button>
							<Button
								variant="contained"
								color="primary"
								onClick={onCloseFilters}
							>
								Ocultar filtros
							</Button>
						</div>
					</form>
				)}
			</Formik>
		</>
	);
};

FiltersForm.propTypes = {
	onSearch: PropTypes.func.isRequired,
	onCloseFilters: PropTypes.func.isRequired,
};

export default FiltersForm;
