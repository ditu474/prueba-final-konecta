import IconButton from '@material-ui/core/IconButton';
import { ArrowBack, ArrowForward } from '@material-ui/icons';
import PropTypes from 'prop-types';
import styles from './Paginator.module.scss';

const Paginator = ({
	children,
	onBackPage,
	onNextPage,
	currentPage,
	nextPageDisable,
}) => {
	return (
		<>
			{children}
			<div className={styles.actions}>
				<IconButton
					aria-label="Previous page"
					onClick={onBackPage}
					disabled={currentPage < 2}
					color="secondary"
				>
					<ArrowBack />
				</IconButton>
				<span arial-label="Page number">{currentPage}</span>
				<IconButton
					aria-label="Next page"
					onClick={onNextPage}
					disabled={nextPageDisable}
					color="secondary"
				>
					<ArrowForward />
				</IconButton>
			</div>
		</>
	);
};

Paginator.propTypes = {
	children: PropTypes.element.isRequired,
	onBackPage: PropTypes.func.isRequired,
	onNextPage: PropTypes.func.isRequired,
	currentPage: PropTypes.number.isRequired,
	nextPageDisable: PropTypes.bool.isRequired,
};

export default Paginator;
