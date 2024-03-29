import { IconButton, ListItem, ListItemText } from '@material-ui/core';
import { Message, MoreHoriz, StarBorderOutlined } from '@material-ui/icons';
import MenuButton from 'components/MenuButton';
import BookstoreCtx from 'context/bookstore';
import PropTypes from 'prop-types';
import React from 'react';
import { useHistory } from 'react-router-dom';

const CharacterQuote = ({ quote }) => {
	const { bookstores, addQuote } = React.useContext(BookstoreCtx);
	const history = useHistory();

	const optionsElements = (bookstores, quote) => {
		const elements = [];
		bookstores.forEach((bookstore) => {
			elements.push({
				name: `Añadir a ${bookstore.name}`,
				action: () =>
					addQuote({ id: quote['quote_id'], quote: quote.quote }, bookstore.id),
			});
		});
		if (elements.length === 0) {
			elements.push({
				name: 'Crear librería',
				action: () => {
					history.push('bookstores');
				},
			});
		}
		return elements;
	};

	const handleRateClick = () => {
		history.push(`/quote/${quote.quote_id}/rate`);
	};

	const handleCommentsClick = () => {
		history.push(`/quote/${quote.quote_id}/comments`);
	};

	return (
		<ListItem
			divider
			className="center-column-childs"
			style={{
				alignItems: 'start',
			}}
		>
			<ListItemText primary={quote.quote} />
			<div>
				<IconButton aria-label="Rate" onClick={handleRateClick}>
					<StarBorderOutlined />
				</IconButton>
				<IconButton aria-label="Comment" onClick={handleCommentsClick}>
					<Message />
				</IconButton>
				<MenuButton elements={optionsElements(bookstores, quote)}>
					<IconButton aria-label="Options">
						<MoreHoriz />
					</IconButton>
				</MenuButton>
			</div>
		</ListItem>
	);
};

CharacterQuote.propTypes = {
	quote: PropTypes.shape({
		quote_id: PropTypes.number.isRequired,
		quote: PropTypes.string.isRequired,
	}),
};

export default CharacterQuote;
