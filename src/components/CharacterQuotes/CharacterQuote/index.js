import { IconButton, ListItem, ListItemText } from '@material-ui/core';
import { Message, MoreHoriz, StarBorderOutlined } from '@material-ui/icons';
import MenuButton from 'components/MenuButton';
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addQuote } from 'store/bookstore';

const CharacterQuote = ({ quote }) => {
	const dispatch = useDispatch();
	const bookstores = useSelector((state) => state.bookstores);

	const history = useHistory();

	const optionsElements = () => {
		const elements = [];

		bookstores.forEach((bookstore) => {
			elements.push({
				name: `Añadir a ${bookstore.name}`,
				action: () => {
					dispatch(
						addQuote({
							quote: { id: quote['quote_id'], quote: quote.quote },
							bookstoreId: bookstore.id,
						})
					);
				},
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
				<MenuButton elements={optionsElements()}>
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
