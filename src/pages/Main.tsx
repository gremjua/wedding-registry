import React from 'react';
import { Box, Button, Container } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import ChooseGiftButton from 'components/common/ChooseGiftButton';

const Main = (): JSX.Element => (
	<Container>
		<Box my='20px' display='flex' flexDirection='column' alignItems='center'>
			<Box my='10px'>
				<ChooseGiftButton />
			</Box>
			<Box my='10px'>
				<Button
					// /* ON CLICK: clear CART and clear AMOUNT from context */
					component={RouterLink}
					to='/giftTagging'
					variant='contained'
					size='large'
					color='primary'
				>
					Enviales dinero
				</Button>
			</Box>
		</Box>
	</Container>
);

export default Main;
