import React, { useContext } from 'react';
import { Box, Button, Container } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import ChooseGiftButton from 'components/common/ChooseGiftButton';
import { CoupleContext } from 'context/CoupleContext';

const Main = (): JSX.Element => {
	const { getCouple } = useContext(CoupleContext);
	const { slug } = getCouple() || {};
	return (
		<Container>
			<Box my='20px' display='flex' flexDirection='column' alignItems='center'>
				<Box my='10px'>
					<ChooseGiftButton />
				</Box>
				<Box my='10px'>
					<Button
						component={RouterLink}
						to={`/${slug}/giftTagging/money`}
						variant='contained'
						size='large'
						color='primary'
						data-cy='sendMoneyButton'
					>
						Enviales dinero
					</Button>
				</Box>
			</Box>
		</Container>
	);
};

export default Main;
