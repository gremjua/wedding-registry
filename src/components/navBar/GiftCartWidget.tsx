import React, { useContext } from 'react';
import { Badge, IconButton } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGifts } from '@fortawesome/free-solid-svg-icons';

const GiftCartWidget = (): JSX.Element | null => {
	// const { giftCart, getTotals } = useContext(GiftCartContext);
	const giftCart = [1, 2];
	// const { totalQuantity } = getTotals();
	return giftCart.length ? (
		<IconButton
			style={{ position: 'absolute', right: '0px' }}
			// component={RouterLink}
			// to='/giftCart'
			color='inherit'
			aria-label='view gift cart'
		>
			{/* // use total quantity */}
			<Badge badgeContent={giftCart.length} color='secondary'>
				<FontAwesomeIcon icon={faGifts} size='lg' />
			</Badge>
		</IconButton>
	) : null;
};

export default GiftCartWidget;
