import { Card, Divider, List, ListItem } from '@material-ui/core';
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
		<div className={classes.root}>
			<h3>Comentarios ({comments.length})</h3>
			<Card variant="outlined">
				<List>
					{comments.map((comment) => (
						<>
							<ListItem key={comment.id}>
								<p>{comment.comment}</p>
							</ListItem>
							<Divider />
						</>
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
