import { IconButton, ListItem, ListItemText } from '@material-ui/core';
import { Message, MoreHoriz, StarBorderOutlined } from '@material-ui/icons';
import PropTypes from 'prop-types';

const Quote = ({ quote }) => {
	return (
		<ListItem
			divider
			style={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'start',
			}}
		>
			<ListItemText primary={quote.quote} />
			<div>
				<IconButton aria-label="Rate">
					<StarBorderOutlined />
				</IconButton>
				<IconButton aria-label="Comment">
					<Message />
				</IconButton>
				<IconButton aria-label="Options">
					<MoreHoriz />
				</IconButton>
			</div>
		</ListItem>
	);
};

Quote.propTypes = {
	quote: PropTypes.shape({
		quote_id: PropTypes.number.isRequired,
		quote: PropTypes.string.isRequired,
	}),
};

export default Quote;
