import { Card, CardContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import CharacterInformation from './CharacterInformation';

const useStyles = makeStyles((theme) => ({
	character: {
		listStyle: 'none',
		margin: theme.spacing(2, 0),
		padding: theme.spacing(2),
	},
	card: {
		width: 250,
	},
	media: {
		height: 300,
		width: '100%',
		objectFit: 'cover',
		overflow: 'hidden',
	},
	content: {
		maxHeight: 300,
		overflow: 'scroll',
	},
}));

const CharacterItem = ({ character }) => {
	const classes = useStyles();

	return (
		<li className={classes.character}>
			<Card className={classes.card}>
				<img
					src={character.img}
					alt={character.name}
					className={classes.media}
				/>
				<CardContent className={classes.content}>
					<CharacterInformation character={character} />
				</CardContent>
			</Card>
		</li>
	);
};

CharacterItem.propTypes = {
	character: PropTypes.shape({
		name: PropTypes.string.isRequired,
		img: PropTypes.string.isRequired,
		birthday: PropTypes.string.isRequired,
		occupation: PropTypes.array.isRequired,
		status: PropTypes.string.isRequired,
		nickname: PropTypes.string.isRequired,
		portrayed: PropTypes.string.isRequired,
	}),
};

export default CharacterItem;
