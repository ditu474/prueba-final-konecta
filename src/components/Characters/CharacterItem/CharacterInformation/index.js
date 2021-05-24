import { Divider, List, ListItem, ListItemText } from '@material-ui/core';
import CharacterQuotes from 'components/CharacterQuotes';
import PropTypes from 'prop-types';
import styles from './CharacterInformation.module.scss';

const CharacterInformation = ({ character }) => {
	return (
		<>
			<h2>{character.name}</h2>
			<h5>
				Fecha Nacimiento: <span>{character.birthday}</span>
			</h5>
			<h5>
				Estado: <span>{character.status}</span>
			</h5>
			<h5>
				Apodo: <span>{character.nickname}</span>
			</h5>
			<h5>
				Protagonista: <span>{character.portrayed}</span>
			</h5>
			<div>
				<h5 className={styles.header}>Ocupaciones: </h5>
				<List>
					{character.occupation.map((occupation) => (
						<div key={occupation}>
							<ListItem>
								<ListItemText primary={occupation} />
							</ListItem>
							<Divider />
						</div>
					))}
				</List>
			</div>
			<div>
				<h5 className={styles.header}>Frases: </h5>
				<CharacterQuotes characterName={character.name} />
			</div>
		</>
	);
};

CharacterInformation.propTypes = {
	character: PropTypes.shape({
		name: PropTypes.string.isRequired,
		birthday: PropTypes.string.isRequired,
		occupation: PropTypes.array.isRequired,
		status: PropTypes.string.isRequired,
		nickname: PropTypes.string.isRequired,
		portrayed: PropTypes.string.isRequired,
	}),
};

export default CharacterInformation;
