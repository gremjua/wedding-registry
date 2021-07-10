import React, { useContext } from 'react';
import { Box, Container } from '@material-ui/core';
import GiftTagForm from 'components/giftTagging/GiftTagForm';
import { useParams } from 'react-router-dom';
import { GiftKind } from 'components/gifts/types';
import { GiftCartContext } from 'context/GiftCartContext';

interface IParams {
	giftKind: GiftKind;
}

const GiftTagging = (): JSX.Element => {
	const { giftKind } = useParams<IParams>();
	const { getTotals } = useContext(GiftCartContext);
	const amount = giftKind === 'cart' ? getTotals().totalPrice : undefined;
	return (
		<Container>
			<Box my='20px'>
				<GiftTagForm amount={amount} /> {/* USE AMOUNT FROM CART CONTEXT */}
			</Box>
		</Container>
	);
};

export default GiftTagging;
