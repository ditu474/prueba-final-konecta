import { List, ListItem, ListItemText } from '@material-ui/core';
import PropTypes from 'prop-types';
import ReactStars from 'react-rating-stars-component';

const RateList = ({ rates }) => {
	let content;
	if (rates.length === 0) {
		content = (
			<ListItem>
				<ListItemText primary="Añade una calificación" />
			</ListItem>
		);
	} else {
		content = rates.map((rate) => (
			<ListItem key={rate.id}>
				<ReactStars
					count={5}
					value={rate.rate}
					size={40}
					isHalf={true}
					activeColor="#ffd700"
					edit={false}
				/>
			</ListItem>
		));
	}

	return (
		<>
			<h2>Historial</h2>
			<List>{content}</List>
		</>
	);
};

RateList.propTypes = {
	rates: PropTypes.array.isRequired,
};

export default RateList;
