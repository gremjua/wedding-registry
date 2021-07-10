import { Divider, Grid, Typography } from '@material-ui/core';
import React from 'react';

const CartHeader = (): JSX.Element => (
	<Grid
		container
		direction='row'
		justify='center'
		alignItems='center'
		spacing={1}
	>
		<Grid item xs={5}>
			<Typography variant='subtitle2' align='center'>
				Regalo
			</Typography>
		</Grid>
		<Grid item xs={5}>
			<Typography variant='subtitle2' align='center'>
				Precio
			</Typography>
		</Grid>
		<Grid item xs={2} />
		<Grid item xs={12}>
			<Divider />
		</Grid>
	</Grid>
);

export default CartHeader;
