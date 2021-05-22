import PropTypes from 'prop-types';

const MenuButton = ({ children }) => {
	return <div>{children}</div>;
};

MenuButton.propTypes = {
	children: PropTypes.element.isRequired,
};

export default MenuButton;
