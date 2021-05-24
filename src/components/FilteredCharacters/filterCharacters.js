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
			const characterTime = new Date(character.birthday).getTime();
			const filterTime = new Date(birthday).getTime();
			console.log(character.name, character.birthday, birthday);
			return characterTime === filterTime;
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
