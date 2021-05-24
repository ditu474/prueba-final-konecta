import { Button } from '@material-ui/core';
import PropTypes from 'prop-types';

const FiltersForm = ({ onSearch, onCloseFilters }) => {
	return (
		<Button variant="contained" color="primary" onClick={onCloseFilters}>
			Ocultar Filtros
		</Button>
	);
};

FiltersForm.propTypes = {
	onSearch: PropTypes.func.isRequired,
	onCloseFilters: PropTypes.func.isRequired,
};

export default FiltersForm;
