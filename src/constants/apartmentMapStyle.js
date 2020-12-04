const locationSystem = [
	{ id: 1, value: 'default', label: 'Latitude Longitude' },
	{ id: 2, value: 'geoCoding', label: 'Input Address' },
];

export const getAllLocationSystem = () => {
	return locationSystem;
};
export const getLocationSystemByValue = (value) => {
	for (let systemType = 0; systemType < locationSystem.length; systemType++) {
		if (locationSystem[systemType].value === value)
			return locationSystem[systemType];
	}
	return locationSystem[0]; // default return both
};
