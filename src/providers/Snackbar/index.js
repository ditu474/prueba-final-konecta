import Button from '@material-ui/core/Button';
import { SnackbarProvider } from 'notistack';
import PropTypes from 'prop-types';
import React from 'react';

const CustomSnackbarProvider = ({ children }) => {
	const snackbarRef = React.createRef();

	const onClickDismiss = (key) => () => {
		snackbarRef.current.closeSnackbar(key);
	};

	return (
		<SnackbarProvider
			maxSnack={3}
			ref={snackbarRef}
			action={(key) => <Button onClick={onClickDismiss(key)}>Dismiss</Button>}
		>
			{children}
		</SnackbarProvider>
	);
};

CustomSnackbarProvider.propTypes = {
	children: PropTypes.element.isRequired,
};

export default CustomSnackbarProvider;
