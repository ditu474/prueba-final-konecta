import { IconButton, ListItem, ListItemText } from '@material-ui/core';
import { Message, MoreHoriz, StarBorderOutlined } from '@material-ui/icons';
import MenuButton from 'components/MenuButton';
import BookstoreCtx from 'context/bookstore';
import PropTypes from 'prop-types';
import React from 'react';

const CharacterQuote = ({ quote }) => {
	const { bookstores, addQuote } = React.useContext(BookstoreCtx);

	const optionsElements = React.useCallback(
		(bookstores, quote) => {
			const optEl = [
				{
					name: 'Detalles',
					action: () => {},
				},
			];
			bookstores.forEach((bookstore) => {
				optEl.push({
					name: `Añadir a ${bookstore.name}`,
					action: () =>
						addQuote(
							{ id: quote['quote_id'], quote: quote.quote },
							bookstore.id
						),
				});
			});
			return optEl;
		},
		[addQuote]
	);

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
