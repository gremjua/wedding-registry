import React from 'react';
import { Box, Container } from '@material-ui/core';
import GiftTagForm from 'components/payment/GiftTagForm';

type Props = {
	amount?: number;
};

const Payment = ({
	amount,
}: Props): JSX.Element => ( // Take out amount, use from CART CONTEXT
	<Container>
		<Box my='20px'>
			<GiftTagForm amount={amount} /> {/* USE AMOUNT FROM CART CONTEXT */}
		</Box>
	</Container>
);

export default Payment;
