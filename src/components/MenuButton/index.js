import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PropTypes from 'prop-types';
import React from 'react';

const MenuButton = ({ children, elements }) => {
	const [anchorEl, setAnchorEl] = React.useState(null);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<>
			<div onClick={handleClick}>{children}</div>
			<Menu
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose}
			>
				{elements.map((element) => (
					<MenuItem key={element.value} onClick={handleClose}>
						{element.name}
					</MenuItem>
				))}
			</Menu>
		</>
	);
};

MenuButton.propTypes = {
	children: PropTypes.element.isRequired,
	elements: PropTypes.array.isRequired,
};

export default MenuButton;
