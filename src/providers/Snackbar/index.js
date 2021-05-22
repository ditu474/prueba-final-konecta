import { SnackbarProvider } from 'notistack';
import PropTypes from 'prop-types';

const CustomSnackbarProvider = ({ children }) => {
	return <SnackbarProvider>{children}</SnackbarProvider>;
};

CustomSnackbarProvider.propTypes = {
	children: PropTypes.element.isRequired,
};

export default CustomSnackbarProvider;
