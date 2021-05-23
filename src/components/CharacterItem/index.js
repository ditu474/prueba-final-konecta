import { Card, CardContent, CardMedia, List } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CharacterQuotes from 'components/CharacterQuotes';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
	character: {
		listStyle: 'none',
		margin: theme.spacing(2, 0),
		padding: theme.spacing(2),
	},
	card: {
		maxWidth: 350,
	},
	media: {
		height: 300,
		width: '100%',
		objectFit: 'cover',
		overflow: 'hidden',
	},
	title: {
		margin: theme.spacing(0, 0, 2, 0),
	},
	content: {
		maxHeight: 300,
		overflow: 'scroll',
	},
	root: {
		width: '100%',
		maxWidth: 350,
	},
}));

const CharacterItem = ({ character }) => {
	const classes = useStyles();

	return (
		<li className={classes.character}>
			<Card className={classes.card}>
				<CardMedia
					className={classes.media}
					image={character.img}
					title={character.name}
					alt={character.name}
				/>
				<CardContent className={classes.content}>
					<h4 className={classes.title}>{character.name}</h4>
					<List className={classes.root}>
						<CharacterQuotes characterName={character.name} />
					</List>
				</CardContent>
			</Card>
		</li>
	);
};

CharacterItem.propTypes = {
	character: PropTypes.shape({
		char_id: PropTypes.number.isRequired,
		name: PropTypes.string.isRequired,
		img: PropTypes.string.isRequired,
	}),
};

export default CharacterItem;
