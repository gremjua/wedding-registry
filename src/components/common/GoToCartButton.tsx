import { Button } from '@material-ui/core';
import { CoupleContext } from 'context/CoupleContext';
import React, { useContext } from 'react';
import { Link as RouterLink } from 'react-router-dom';

const GoToCartButton = (): JSX.Element => {
	const { getCouple } = useContext(CoupleContext);
	const { slug } = getCouple() || {};

	return (
		<Button
			component={RouterLink}
			to={`/${slug}/giftCart`}
			variant='contained'
			size='small'
			color='primary'
			data-cy='goToCartButton'
		>
			Ir al carrito
		</Button>
	);
};

export default GoToCartButton;
