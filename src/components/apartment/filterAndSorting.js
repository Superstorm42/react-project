import React from 'react';
import { getAllSortingData } from '../../constants/apartmentSortingData';
import { Row, Col } from 'react-bootstrap';
const ApartmentFilterSorting = (props) => {
	const allSortingData = getAllSortingData();
	const filterData = props.filterData;
	return (
		<>
			Filter and Sort
			<h4>Filter</h4>
			{filterData.map((fData, i) => {
				return (
					<div key={i} value={i} className="boxDiv">
						<h6>{filterData[i].label}</h6>

						{filterData[i].filters.map((fltr, j) => {
							return (
								<Row className="form-group" key={fltr.name}>
									<Col sm={4}>
										<label>{fltr.label}</label>
									</Col>
									<Col sm={8}>
										<input
											className={
												'form-control filterBox-' +
												fltr.type
											}
											type={fltr.type}
											value={fltr.value}
											onChange={(e) => {
												props.onChangeFilterData(
													i,
													fltr.name,
													e
												);
											}}
										/>
									</Col>
								</Row>
							);
						})}
					</div>
				);
			})}
			<hr />
			<h4>Sort By</h4>
			<Row>
				<Col sm={12}>
					{
						<select
							className="form-control"
							onChange={props.onChangeSortingData}
							value={props.locationSystem}
						>
							{allSortingData.map((sdata, i) => {
								return (
									<option value={sdata.id} key={sdata.id}>
										{sdata.name}
									</option>
								);
							})}
						</select>
					}
				</Col>
			</Row>
		</>
	);
};
export default ApartmentFilterSorting;
