import { Button } from '@material-ui/core';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

type Props = {
	message?: string;
};

const ChooseGiftButton = ({
	message = 'Elegí un regalo',
}: Props): JSX.Element => (
	<Button
		component={RouterLink}
		to='/gifts'
		variant='contained'
		size='large'
		color='primary'
	>
		{message}
	</Button>
);

export default ChooseGiftButton;
