import { Grid } from '@material-ui/core';
import { Gift } from 'components/gifts/types';
import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import CartFooter from './CartFooter';
import CartHeader from './CartHeader';
import CartItem from './CartItem';
import './styles.css';

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
		<TransitionGroup>
			{items.map(item => (
				<CSSTransition key={item.id} timeout={300} classNames='item'>
					<Grid item xs={12}>
						<CartItem item={item} />
					</Grid>
				</CSSTransition>
			))}
		</TransitionGroup>
		<Grid item xs={12}>
			<CartFooter />
		</Grid>
	</Grid>
);

export default CartItemList;
