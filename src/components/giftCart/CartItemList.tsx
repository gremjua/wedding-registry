import { Grid } from '@material-ui/core';
import { Gift } from 'components/gifts/types';
import React from 'react';
import CartFooter from './CartFooter';
import CartHeader from './CartHeader';
import CartItem from './CartItem';

type Props = {
	items: Gift[];
};

const CartItemList = ({ items }: Props): JSX.Element => (
	<Grid
		container
		direction='column'
		alignItems='stretch'
		justify='center'
		spacing={1}
		style={{ minWidth: 300, border: '1px solid black' }}
	>
		<Grid item xs={12}>
			<CartHeader />
		</Grid>
		{items.map(item => (
			<Grid key={item.id} item xs={12}>
				<CartItem item={item} />
			</Grid>
		))}
		<Grid item xs={12}>
			<CartFooter />
		</Grid>
	</Grid>
);

export default CartItemList;
