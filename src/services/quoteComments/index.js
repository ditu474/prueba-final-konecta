import { getSavedResource, saveResource } from 'services/localStorage';

const QUOTE_COMMENTS_KEY = 'quoteComments';

export const getQuoteComments = (quoteId) => {
	const quoteComments = getSavedResource(QUOTE_COMMENTS_KEY);

	if (quoteComments.length === 0) return [];

	const quoteComment = quoteComments.find((quote) => quote.id === quoteId);
	if (!quoteComment) {
		return [];
	}

	return quoteComment.comments;
};

export const saveQuoteComment = (quoteId, comment) => {
	const quoteCommentsSaved = getSavedResource(QUOTE_COMMENTS_KEY);
	if (quoteCommentsSaved.length === 0) {
		saveResource([{ id: quoteId, comments: [comment] }], QUOTE_COMMENTS_KEY);
		return;
	}

	const quoteComment = quoteCommentsSaved.find((quote) => quote.id === quoteId);
	if (!quoteComment) {
		saveResource(
			[{ id: quoteId, comments: [comment] }, ...quoteCommentsSaved],
			QUOTE_COMMENTS_KEY
		);
		return;
	}

	quoteComment.comments.unshift(comment);
	saveResource(quoteCommentsSaved, QUOTE_COMMENTS_KEY);
};
