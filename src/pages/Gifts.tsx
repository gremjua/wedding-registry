import React, { useState, useContext, useEffect } from 'react';
import { Box, Container } from '@material-ui/core';
import { Filter, Gift } from 'components/gifts/types';
import GiftItemList from 'components/gifts/GiftItemList';
import PriceFilter from 'components/gifts/PriceFilter';
import { GiftItemsContext } from 'context/GiftItemsContext';

// type Props = {};

const MAX_GIFT_VALUE = 1000000;

const Gifts = (): JSX.Element => {
	const { getItems } = useContext(GiftItemsContext);
	const gifts = getItems();
	const [displayedGifts, setDisplayedGifts] = useState<Gift[]>([]);
	const [filter, setFilter] = useState<Filter>({
		min: 0,
		max: MAX_GIFT_VALUE,
	});
	useEffect(() => {
		setDisplayedGifts([
			...gifts.filter(
				gift => gift.price <= filter.max && gift.price >= filter.min
			),
		]);
	}, [filter]);

	return (
		<Container>
			<Box my='20px' display='flex' flexDirection='column' alignItems='center'>
				<PriceFilter handleFilter={setFilter} />
				<GiftItemList gifts={displayedGifts} />
			</Box>
		</Container>
	);
};

export default Gifts;
