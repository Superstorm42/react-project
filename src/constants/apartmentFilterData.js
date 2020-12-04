const filteringData = [
	{
		name: 'name',
		label: 'Apartment Name',
		filters: [{ name: 'name', value: '', label: 'Search', type: 'text' }],
	},
	{
		name: 'area',
		label: 'Floor Area Size',
		filters: [
			{ name: 'min_area', value: 0, label: 'Minimum', type: 'number' },
			{
				name: 'max_area',
				value: 10000.0,
				label: 'Maximum',
				type: 'number',
			},
		],
	},
	{
		name: 'price',
		label: 'Price Per Month',
		filters: [
			{ name: 'min_price', value: 0, label: 'Minimum', type: 'number' },
			{
				name: 'max_price',
				value: 1000000.0,
				label: 'Maximum',
				type: 'number',
			},
		],
	},
	{
		name: 'rooms',
		label: 'Number Of Rooms',
		filters: [
			{ name: 'min_rooms', value: 0, label: 'Minimum', type: 'number' },
			{ name: 'max_rooms', value: 100, label: 'Maximum', type: 'number' },
		],
	},
];

export const getAllFilteringData = () => {
	return filteringData;
};
export const getFilteringDataById = (id) => {
	return filteringData[id];
};
