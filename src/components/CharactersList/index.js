import PropTypes from 'prop-types';
import CharacterItem from './CharacterItem';

const CharactersList = ({ characters }) => {
	return (
		<ul className="list">
			{characters.map((character) => (
				<CharacterItem key={character['char_id']} character={character} />
			))}
		</ul>
	);
};

CharactersList.propTypes = {
	characters: PropTypes.array.isRequired,
};

export default CharactersList;
