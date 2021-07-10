import { Grid } from '@material-ui/core';
import { Gift } from 'components/gifts/types';
import React from 'react';
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
		spacing={3}
		style={{ minWidth: 300, border: '1px solid black' }}
	>
		{items.map(item => (
			<Grid key={item.id} item xs={12}>
				<CartItem item={item} />
			</Grid>
		))}
	</Grid>
);

export default CartItemList;
