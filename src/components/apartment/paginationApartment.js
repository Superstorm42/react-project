import React from 'react';
import Pagination from 'react-js-pagination';
const min = (num1, num2) => {
	if (num1 >= num2) return num2;
	else return num1;
};
const ApartmentFilterSorting = (props) => {
	return (
		<div style={{ textAlign: 'center' }}>
			<hr />
			<Pagination
				activePage={props.currentPage}
				itemsCountPerPage={25}
				totalItemsCount={props.totalApartments}
				pageRangeDisplayed={min(5, props.totalPages)}
				itemClass="page-item"
				linkClass="page-link"
				onChange={(pageNumber) => {
					props.handlePageChange(pageNumber);
				}}
			/>
		</div>
	);
};
export default ApartmentFilterSorting;
