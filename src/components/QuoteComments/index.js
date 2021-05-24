import PropTypes from 'prop-types';
import React from 'react';
import { getQuoteComments, saveQuoteComment } from 'services/quoteComments';
import AddCommentForm from './AddCommentForm';
import CommentList from './CommentList';

const QuoteComments = ({ quoteId }) => {
	const [comments, setComments] = React.useState([]);

	React.useEffect(() => {
		setComments(getQuoteComments(quoteId));
		// eslint-disable-next-line
	}, []);

	const addCommentHandler = (comment) => {
		setComments((prevComments) => {
			const newComment = { id: Math.random(), comment };
			saveQuoteComment(quoteId, newComment);
			const newComments = [newComment, ...prevComments];
			return newComments;
		});
	};

	return (
		<div
			style={{
				margin: '2rem 0',
			}}
			className="center-column-childs"
		>
			<AddCommentForm onAddComment={addCommentHandler} />
			<CommentList comments={comments} />
		</div>
	);
};

QuoteComments.propTypes = {
	quoteId: PropTypes.number.isRequired,
};

export default QuoteComments;
