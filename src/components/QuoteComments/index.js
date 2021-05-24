import PropTypes from 'prop-types';
import React from 'react';
import { getQuoteComments, saveQuoteComment } from 'services/quoteComments';
import AddCommentForm from './AddCommentForm';

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
				marginTop: '2rem',
			}}
			className="center-column-childs"
		>
			<AddCommentForm onAddComment={addCommentHandler} />
			<ul>
				{comments.map((comment) => (
					<li key={comment.id}>{comment.comment}</li>
				))}
			</ul>
		</div>
	);
};

QuoteComments.propTypes = {
	quoteId: PropTypes.number.isRequired,
};

export default QuoteComments;
