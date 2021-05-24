export const getSavedResource = (key) => {
	const savedResource = localStorage.getItem(key);
	if (!savedResource) {
		return [];
	}
	return JSON.parse(savedResource);
};

export const saveResource = (resource, key) => {
	try {
		localStorage.setItem(key, JSON.stringify(resource));
	} catch (err) {
		console.error('Error saving resource: ', err.message);
	}
};
