import React from 'react';
import { Box, Button, Container } from '@material-ui/core';
import { Link as RouterLink, useRouteMatch } from 'react-router-dom';
import ChooseGiftButton from 'components/common/ChooseGiftButton';

const Main = (): JSX.Element => {
	const { url } = useRouteMatch();
	return (
		<Container>
			<Box my='20px' display='flex' flexDirection='column' alignItems='center'>
				<Box my='10px'>
					<ChooseGiftButton />
				</Box>
				<Box my='10px'>
					<Button
						component={RouterLink}
						to={`${url}/giftTagging/money`}
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
};

export default Main;
