import { Button, TextField } from '@material-ui/core';
import { Formik } from 'formik';
import PropTypes from 'prop-types';

const initialValues = {
	comment: '',
};

const commentValidator = (comment) => {
	if (!comment) return 'No puede estar vacio';
	if (comment.length > 200) return 'Máximo 200 caracteres';
	return '';
};

const AddCommentForm = ({ onAddComment }) => {
	const validate = ({ comment }) => {
		const errors = {};
		const commentError = commentValidator(comment);
		if (commentError) {
			errors.comment = commentError;
		}
		return errors;
	};

	const submitHandler = (values, { setSubmitting, resetForm }) => {
		onAddComment(values.comment.trim());
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
					name="NewComment"
					onSubmit={handleSubmit}
					className="center-column-childs"
				>
					<TextField
						multiline
						rows={4}
						variant="filled"
						placeholder="Escribe un comentario..."
						type="text"
						name="comment"
						id="comment"
						onChange={handleChange}
						onBlur={handleBlur}
						value={values.comment}
						error={!!errors.comment && touched.comment}
						helperText={!!errors.comment && touched.comment && errors.comment}
					/>
					<Button
						variant="contained"
						color="primary"
						disabled={isSubmitting}
						type="submit"
						style={{ marginTop: '1rem' }}
					>
						Comentar
					</Button>
				</form>
			)}
		</Formik>
	);
};

AddCommentForm.propTypes = {
	onAddComment: PropTypes.func.isRequired,
};

export default AddCommentForm;
