import { Box, Container, Typography } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLaugh } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

// after paying through Mercadopago: url =
// http://localhost:3000/{coupleSlug}/thanks?collection_id=1240189240&collection_status=approved&payment_id=1240189240&status=approved&external_reference=null&payment_type=credit_card&merchant_order_id=3152600976&preference_id=185110306-56a13ac4-1149-4897-a8fb-57af90c4e450&site_id=MLA&processing_mode=aggregator&merchant_account_id=null

const Thanks = (): JSX.Element => (
	<Container>
		<Box my='20px'>
			<Box my='10px' display='flex' flexDirection='column' alignItems='center'>
				<Typography variant='h6' align='center' data-cy='thanksPageMessage'>
					¡Muchas gracias por tu regalo!
				</Typography>
				<FontAwesomeIcon icon={faLaugh} size='10x' data-cy='thanksPageIcon' />
			</Box>
		</Box>
	</Container>
);

export default Thanks;
