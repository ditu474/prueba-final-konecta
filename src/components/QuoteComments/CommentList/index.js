import { Card, Divider, List, ListItem, ListItemText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const useStyles = makeStyles({
	root: {
		width: '100%',
		maxWidth: 600,
	},
});

const CommentList = ({ comments }) => {
	const classes = useStyles();
	return (
		<div
			className={`${classes.root} container`}
			style={{ marginBottom: '2rem' }}
		>
			<h3>Comentarios ({comments.length})</h3>
			<Card variant="outlined">
				<List>
					{comments.map((comment) => (
						<div key={comment.id}>
							<ListItem button>
								<ListItemText
									style={{ overflowWrap: 'break-word' }}
									primary={comment.comment}
								/>
							</ListItem>
							<Divider />
						</div>
					))}
				</List>
			</Card>
		</div>
	);
};

CommentList.propTypes = {
	comments: PropTypes.array.isRequired,
};

export default CommentList;
