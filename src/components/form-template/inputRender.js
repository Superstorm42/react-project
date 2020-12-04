import React from 'react';
export const InputRender = ({
	input,
	label,
	type,
	placeholder,
	meta: { touched, error, warning },
}) => {
	const Classname = `form-group row ${
		touched ? (error ? 'has-danger' : '') : ''
	}`;

	return (
		<div className={Classname}>
			<div className="col-sm-3">
				<b>{label}</b>
			</div>

			<div className="col-sm-8">
				<input
					{...input}
					placeholder={placeholder}
					type={type}
					className="form-control"
				/>
				{touched &&
					((error && <span>{error}</span>) ||
						(warning && <span>{warning}</span>))}
			</div>
		</div>
	);
};

export const TextRender = ({
	input,
	label,
	placeholder,
	type,
	meta: { touched, error, warning },
}) => {
	const Classname = `form-group row ${
		touched && error ? 'has-danger' : 'has-success'
	}`;
	return (
		<div className={Classname}>
			<label className="col-sm-3">
				<b>{label}</b>
			</label>
			<div className="col-sm-8">
				<textarea
					{...input}
					placeholder={placeholder}
					rows="5"
					className="form-control"
				/>
				{touched &&
					((error && <span>{error}</span>) ||
						(warning && <span>{warning}</span>))}
			</div>
		</div>
	);
};
export const CheckBoxRender = ({
	input,
	label,
	type,
	placeholder,
	meta: { touched, error, warning },
}) => {
	return (
		<div className="form-group row">
			<label className="col-sm-3">
				<b>{label}</b>
			</label>
			<div className="col-sm-8">
				<input {...input} type={type} />
			</div>
		</div>
	);
};
export const InputNumberRender = ({
	input,
	label,
	type,
	placeholder,
	step,
	min,
	max,
	unit,
	meta: { touched, error, warning },
}) => {
	const className = `form-group row ${
		touched && error ? 'has-danger' : 'has-success'
	}`;
	return (
		<div className={className}>
			<label className="col-sm-3 col-form-label">{label}</label>
			<div className="col-sm-8">
				<div className="input-group">
					<input
						style={{ float: 'left' }}
						{...input}
						placeholder={placeholder}
						step={step}
						min={min}
						max={max}
						type={type}
						className="form-control"
					/>
					<span className="InputNumberUnitSpan">{unit}</span>
				</div>
				{touched &&
					((error && <span>{error}</span>) ||
						(warning && <span>{warning}</span>))}
			</div>
		</div>
	);
};
export const SaInputRender = ({
	input,
	label,
	type,
	placeholder,
	meta: { asyncValidating, touched, error, warning },
}) => {
	const Classname = `form-group row ${
		touched ? (error ? 'has-danger' : '') : ''
	}`;

	return (
		<div style={{ marginBottom: '10px' }} className={Classname}>
			<label className="col-sm-4 signUpLabel">{label}</label>

			<div
				className={
					asyncValidating ? 'async-validating col-sm-8' : 'col-sm-8'
				}
			>
				<input
					{...input}
					placeholder={placeholder}
					type={type}
					className={'form-control ' + input.name}
				/>
				{touched &&
					((error && <span>{error}</span>) ||
						(warning && <span>{warning}</span>))}
			</div>
		</div>
	);
};
export const SelectRender = ({
	input,
	label,
	placeholder,
	type,
	meta: { touched, error },
	children,
}) => {
	const Classname = `form-group row ${
		touched ? (error ? 'has-danger' : '') : ''
	}`;
	return (
		<div className={Classname}>
			<label className="col-sm-3">
				<b>{label}</b>
			</label>
			<div className="col-sm-8">
				<select {...input} className="form-control">
					{children}
				</select>
				{touched && error && <span>{error}</span>}
			</div>
		</div>
	);
};
