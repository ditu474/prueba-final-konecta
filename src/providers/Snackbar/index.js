import Button from '@material-ui/core/Button';
import Slide from '@material-ui/core/Slide';
import { SnackbarProvider } from 'notistack';
import PropTypes from 'prop-types';
import React from 'react';

const CustomSnackbarProvider = ({ children }) => {
	const notistackRef = React.createRef();

	const onClickDismiss = (key) => () => {
		notistackRef.current.closeSnackbar(key);
	};

	return (
		<SnackbarProvider
			maxSnack={3}
			ref={notistackRef}
			action={(key) => <Button onClick={onClickDismiss(key)}>Dismiss</Button>}
			anchorOrigin={{
				vertical: 'bottom',
				horizontal: 'left',
			}}
			TransitionComponent={Slide}
		>
			{children}
		</SnackbarProvider>
	);
};

CustomSnackbarProvider.propTypes = {
	children: PropTypes.element.isRequired,
};

export default CustomSnackbarProvider;
