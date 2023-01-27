import { Box, Grid, IconButton, Typography } from '@material-ui/core';
import { Gift } from 'components/gifts/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import React, { useContext } from 'react';
import { GiftCartContext } from 'context/GiftCartContext';
import { numberToPriceString } from 'utils/price';

type Props = {
	item: Gift;
};

const CartItem = ({ item: gift }: Props): JSX.Element => {
	const { removeGiftFromCart } = useContext(GiftCartContext);
	return (
		<Grid
			container
			direction='row'
			justify='center'
			alignItems='center'
			spacing={1}
			data-cy='giftCartItem'
		>
			<Grid item xs={5}>
				<Box
					display='flex'
					flexDirection='column'
					justifyContent='center'
					alignItems='center'
				>
					<img
						src={gift.imageUrl}
						alt={gift.name}
						style={{ width: '70px', height: '70px', objectFit: 'cover' }}
					/>
					<Typography variant='caption' align='center'>
						{gift.name}
					</Typography>
				</Box>
			</Grid>
			<Grid item xs={5}>
				<Typography variant='subtitle2' align='center'>
					{numberToPriceString(gift.price, 'AR$')}
				</Typography>
			</Grid>
			<Grid item xs={2}>
				<IconButton
					data-cy='removeGiftButton'
					onClick={() => removeGiftFromCart(gift)}
				>
					<FontAwesomeIcon icon={faMinusCircle} size='sm' />
				</IconButton>
			</Grid>
		</Grid>
	);
};

export default CartItem;
