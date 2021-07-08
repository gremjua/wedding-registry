import React from 'react';
import { Box, makeStyles, Slider, Typography } from '@material-ui/core';
import { Filter } from './types';

type Props = {
	handleFilter: (filter: Filter) => void;
};

const useStyles = makeStyles({
	thumb: {
		'& .MuiSlider-valueLabel': {
			padding: 0,
		},
	},
});

const sliderValues = [
	{
		value: 1000,
		label: '$1k',
	},
	{
		value: 10000,
		label: '$10k',
	},
	{
		value: 50000,
		label: '$50k',
	},
	{
		value: 100000,
		label: '$100k',
	},
	{
		value: 1000000,
		label: '$1M',
	},
];

const marks = [
	{
		value: 0,
		label: '$1000',
	},
	{
		value: 2,
		label: '$50000',
	},
	{
		value: 4,
		label: '$1M',
	},
];

const valueLabelFormat = (value: number) => sliderValues[value].label;

const PriceFilter = ({ handleFilter }: Props): JSX.Element => {
	const classes = useStyles();
	const [value, setValue] = React.useState<number[]>([
		0,
		sliderValues.length - 1,
	]);
	const handleChange = (event: any, newValue: number | number[]) => {
		setValue(newValue as number[]);
		handleFilter({
			min: sliderValues[(newValue as number[])[0]].value,
			max: sliderValues[(newValue as number[])[1]].value,
		});
	};

	return (
		<Box width='80%'>
			<Typography id='price-filter' gutterBottom>
				Filtra por precio
			</Typography>
			<Slider
				className={classes.thumb}
				value={value}
				valueLabelFormat={valueLabelFormat}
				getAriaValueText={valueLabelFormat}
				aria-labelledby='discrete-slider-restrict'
				min={0}
				max={sliderValues.length - 1}
				step={1}
				valueLabelDisplay='auto'
				onChange={handleChange}
				marks={marks}
			/>
		</Box>
	);
};

export default PriceFilter;
