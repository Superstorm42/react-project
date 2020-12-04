const sortingData = [
	{ id: 0, name: 'Default', option: 'date', order: 'desc' },
	{ id: 1, name: 'Size low to high', option: 'area', order: 'asc' },
	{ id: 2, name: 'Size high to low', option: 'area', order: 'desc' },
	{ id: 3, name: 'Price low to high', option: 'price', order: 'asc' },
	{ id: 4, name: 'Price high to low', option: 'price', order: 'desc' },
	{ id: 5, name: 'Total Rooms low to high', option: 'rooms', order: 'asc' },
	{ id: 6, name: 'Total Rooms high to low', option: 'rooms', order: 'desc' },
];

export const getAllSortingData = () => {
	return sortingData;
};
export const getSortingDataById = (id) => {
	return sortingData[id];
};
