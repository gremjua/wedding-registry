import React from 'react';
import { Box, Button, Container } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';

const Main = (): JSX.Element => (
	<Container>
		<Box my='20px' display='flex' flexDirection='column' alignItems='center'>
			<Box my='10px'>
				<Button
					component={RouterLink}
					to='/gifts'
					variant='contained'
					size='large'
					color='primary'
				>
					Elegí un regalo
				</Button>
			</Box>
			<Box my='10px'>
				<Button
					// /* ON CLICK: clear CART and clear AMOUNT from context */
					component={RouterLink}
					to='/payment'
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
