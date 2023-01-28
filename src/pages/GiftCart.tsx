import { Box, Container, Typography } from '@material-ui/core';
import ChooseGiftButton from 'components/common/ChooseGiftButton';
import CartItemList from 'components/giftCart/CartItemList';
import { GiftCartContext } from 'context/GiftCartContext';
import React, { useContext } from 'react';

const GiftCart = (): JSX.Element => {
	const { getGiftCart } = useContext(GiftCartContext);
	const giftCart = getGiftCart();

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
				{giftCart.length ? (
					<CartItemList items={giftCart} />
				) : (
					<Box
						display='flex'
						flexDirection='column'
						alignItems='center'
						justifyContent='center'
						height='80vh'
						width='100%'
						maxWidth='300px'
					>
						<Typography gutterBottom variant='body1' align='center'>
							El carrito esta vacío
						</Typography>
						<ChooseGiftButton />
					</Box>
				)}
			</Box>
		</Container>
	);
};

export default GiftCart;
