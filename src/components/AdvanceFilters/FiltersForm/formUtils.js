import validator from 'validator';

export const initialValues = {
	name: '',
	birthday: '',
	occupation: '',
	status: '',
	nickname: '',
	portrayed: '',
};

const alphaValidator = (str) => {
	return !validator.isAlpha(str, 'en-US', { ignore: ' -' });
};

const birthdayValidator = (birthday) => {
	return !validator.isDate(birthday);
};

export const validateForm = (values) => {
	const errors = {};
	if (!!values.name && alphaValidator(values.name)) {
		errors.name = 'Sólo ingrese letras y en inglés';
	}
	if (!!values.birtday && birthdayValidator(values.birthday)) {
		errors.birthday = 'Fecha inválida';
	}
	if (!!values.occupation && alphaValidator(values.occupation)) {
		errors.occupation = 'Sólo ingrese letras y en inglés';
	}
	if (!!values.status && alphaValidator(values.status)) {
		errors.status = 'Sólo ingrese letras y en inglés';
	}
	if (!!values.nickname && alphaValidator(values.nickname)) {
		errors.nickname = 'Sólo ingrese letras y en inglés';
	}
	if (!!values.portrayed && alphaValidator(values.portrayed)) {
		errors.portrayed = 'Sólo ingrese letras y en inglés';
	}
	return errors;
};

const trimValue = (val) => {
	const valTrim = val.trim();
	return !!valTrim ? valTrim : null;
};

const cleanValues = (values) => {
	const newValues = {};
	const name = trimValue(values.name);
	if (!!name) newValues.name = name;
	const birthday = trimValue(values.birthday);
	if (!!birthday) newValues.birtday = birthday;
	const occupation = trimValue(values.occupation);
	if (!!occupation) newValues.occupation = occupation;
	const status = trimValue(values.status);
	if (!!status) newValues.status = status;
	const nickname = trimValue(values.nickname);
	if (!!nickname) newValues.nickname = nickname;
	const portrayed = trimValue(values.portrayed);
	if (!!portrayed) newValues.portrayed = portrayed;
	return newValues;
};

export const submitHandler =
	(callback) =>
	(values, { setSubmitting }) => {
		callback(cleanValues(values));
		setSubmitting(false);
	};
