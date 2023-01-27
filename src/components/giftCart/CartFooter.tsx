import { Button, Divider, Grid, Typography } from '@material-ui/core';
import ChooseGiftButton from 'components/common/ChooseGiftButton';
import { GiftCartContext } from 'context/GiftCartContext';
import { Link as RouterLink } from 'react-router-dom';
import React, { useContext } from 'react';
import { CoupleContext } from 'context/CoupleContext';
import { numberToPriceString } from 'utils/price';

const CartFooter = (): JSX.Element => {
	const { getTotals } = useContext(GiftCartContext);
	const { totalPrice } = getTotals();
	const { getCouple } = useContext(CoupleContext);
	const { slug } = getCouple() || {};
	return (
		<Grid
			container
			direction='row'
			justify='center'
			alignItems='center'
			spacing={1}
		>
			<Grid item xs={12}>
				<Divider />
			</Grid>
			<Grid item xs={5}>
				<Typography variant='h6' align='center'>
					Total
				</Typography>
			</Grid>
			<Grid item xs={5}>
				<Typography variant='h6' align='center'>
					{numberToPriceString(totalPrice, 'AR$')}
				</Typography>
			</Grid>
			<Grid item xs={2} />
			<Grid item xs={12}>
				<Grid
					container
					direction='column'
					justify='center'
					alignItems='stretch'
					alignContent='center'
					spacing={1}
				>
					<Grid item xs={12}>
						<Button
							component={RouterLink}
							to={`/${slug}/giftTagging/cart`}
							variant='contained'
							size='large'
							color='secondary'
							style={{ width: '100%' }}
							data-cy='payButton'
						>
							Pagar
						</Button>
					</Grid>
					<Grid item xs={12}>
						<ChooseGiftButton message='Agregar regalos' />
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
};

export default CartFooter;
