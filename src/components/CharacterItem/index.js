import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
	character: {
		listStyle: 'none',
		margin: theme.spacing(2, 0),
		padding: theme.spacing(2),
	},
	media: {
		height: 300,
		width: 250,
		objectFit: 'cover',
		overflow: 'hidden',
	},
	title: {
		margin: theme.spacing(0, 0, 2, 0),
	},
}));

const CharacterItem = ({ character }) => {
	const classes = useStyles();

	return (
		<li className={classes.character}>
			<Card>
				<CardMedia
					className={classes.media}
					image={character.img}
					title={character.name}
					alt={character.name}
				/>
				<CardContent>
					<h4 className={classes.title}>{character.name}</h4>
					<ul>
						<li>Quote</li>
					</ul>
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
