import { Button } from '@material-ui/core';
import { CoupleContext } from 'context/CoupleContext';
import React, { useContext } from 'react';
import { Link as RouterLink } from 'react-router-dom';

type Props = {
	message?: string;
};

const ChooseGiftButton = ({
	message = 'Elegir un regalo',
}: Props): JSX.Element => {
	const { getCouple } = useContext(CoupleContext);
	const { slug } = getCouple() || {};
	return (
		<Button
			component={RouterLink}
			to={`/${slug}/gifts`}
			variant='contained'
			size='large'
			color='primary'
			data-cy='chooseGiftButton'
		>
			{message}
		</Button>
	);
};

export default ChooseGiftButton;
