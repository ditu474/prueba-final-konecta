import IconButton from '@material-ui/core/IconButton';
import Slide from '@material-ui/core/Slide';
import Close from '@material-ui/icons/Close';
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
			action={(key) => (
				<IconButton
					aria-label="close snackbar"
					component="span"
					onClick={onClickDismiss(key)}
				>
					<Close />
				</IconButton>
			)}
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
