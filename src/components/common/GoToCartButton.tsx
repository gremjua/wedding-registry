import { Button } from '@material-ui/core';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

const GoToCartButton = (): JSX.Element => (
	<Button
		component={RouterLink}
		to='/giftCart'
		variant='contained'
		size='small'
		color='primary'
	>
		Ir al carrito
	</Button>
);

export default GoToCartButton;
