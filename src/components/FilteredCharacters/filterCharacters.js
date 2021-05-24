import { DateTime } from 'luxon';

const filterListByKey = (list, key, compareTo) => {
	return list.filter((element) =>
		element[key].toLowerCase().includes(compareTo.toLowerCase())
	);
};

const filterList = (characters, filters) => {
	let filteredCharacters = [...characters];
	const name = filters.name;
	if (!!name) {
		filteredCharacters = filterListByKey(filteredCharacters, 'name', name);
	}
	const birthday = filters.birthday;
	if (!!birthday) {
		filteredCharacters = filteredCharacters.filter((character) => {
			const characterDate = new Date(character.birthday);
			if (!characterDate) return false;

			const characterTime = DateTime.fromJSDate(characterDate);
			const filterTime = DateTime.fromISO(birthday);
			return characterTime.equals(filterTime);
		});
	}
	const occupation = filters.occupation;
	if (!!occupation) {
		filteredCharacters = filteredCharacters.filter((character) => {
			for (let val of character.occupation) {
				if (val.toLowerCase().includes(occupation.toLowerCase())) return true;
			}
			return false;
		});
	}
	const status = filters.status;
	if (!!status) {
		filteredCharacters = filterListByKey(filteredCharacters, 'status', status);
	}
	const nickname = filters.nickname;
	if (!!nickname) {
		filteredCharacters = filterListByKey(
			filteredCharacters,
			'nickname',
			nickname
		);
	}
	const portrayed = filters.portrayed;
	if (!!portrayed) {
		filteredCharacters = filterListByKey(
			filteredCharacters,
			'portrayed',
			portrayed
		);
	}
	return filteredCharacters;
};

export default filterList;
