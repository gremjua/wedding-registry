import { Box, Container, Typography } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLaugh } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

const Thanks = () => (
	<Container>
		<Box my='20px'>
			<Box my='10px' display='flex' flexDirection='column' alignItems='center'>
				<Typography variant='h6' align='center'>
					¡Muchas gracias por tu regalo!
				</Typography>
				<FontAwesomeIcon icon={faLaugh} size='10x' />
			</Box>
		</Box>
	</Container>
);

export default Thanks;
