import React, { useContext } from 'react';
import { Badge, IconButton } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGifts } from '@fortawesome/free-solid-svg-icons';
import { Link as RouterLink } from 'react-router-dom';
import { GiftCartContext } from 'context/GiftCartContext';

const GiftCartWidget = ({ slug }: { slug: string }): JSX.Element | null => {
	const { getGiftCart } = useContext(GiftCartContext);
	const giftCart = getGiftCart();
	return giftCart.length ? (
		<IconButton
			style={{ position: 'absolute', right: '0px' }}
			component={RouterLink}
			to={`/${slug}/giftCart`}
			color='inherit'
			aria-label='view gift cart'
			data-cy='navBarGoToCartButton'
		>
			{/* // use total quantity */}
			<Badge badgeContent={giftCart.length} color='secondary'>
				<FontAwesomeIcon icon={faGifts} size='lg' />
			</Badge>
		</IconButton>
	) : null;
};

export default GiftCartWidget;
