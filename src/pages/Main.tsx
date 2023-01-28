import React, { useContext } from 'react';
import { Box, Button, Container } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import ChooseGiftButton from 'components/common/ChooseGiftButton';
import { CoupleContext } from 'context/CoupleContext';

const renderRsvpButton = (rsvpUrl: string): JSX.Element => (
	<Box my='10px' width='100%' maxWidth='300px'>
		<Button
			href={rsvpUrl}
			target='_blank'
			variant='contained'
			size='large'
			color='primary'
			data-cy='rsvpButton'
			fullWidth
		>
			RSVP
		</Button>
	</Box>
);

const Main = (): JSX.Element => {
	const { getCouple } = useContext(CoupleContext);
	const { slug, rsvpUrl } = getCouple() || {};
	return (
		<Container>
			<Box
				my='20px'
				display='flex'
				flexDirection='column'
				alignItems='center'
				justifyContent='center'
				width='100%'
			>
				<Box my='10px' width='100%' maxWidth='300px'>
					<ChooseGiftButton />
				</Box>
				<Box my='10px' width='100%' maxWidth='300px'>
					<Button
						component={RouterLink}
						to={`/${slug}/giftTagging/money`}
						variant='contained'
						size='large'
						color='primary'
						data-cy='sendMoneyButton'
						fullWidth
					>
						Enviarles dinero
					</Button>
				</Box>
				{rsvpUrl && renderRsvpButton(rsvpUrl)}
			</Box>
		</Container>
	);
};

export default Main;
