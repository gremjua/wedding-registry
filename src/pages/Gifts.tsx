import React, { useState, useContext, useEffect } from 'react';
import { Box, Container } from '@material-ui/core';
import { Filter, Gift } from 'components/gifts/types';
import GiftItemList from 'components/gifts/GiftItemList';
import PriceFilter from 'components/gifts/PriceFilter';
import percheroNordico from 'images/gifts/percheroNordico.jpg';

// type Props = {};

const MAX_GIFT_VALUE = 1000000;

const Gifts = () => {
	// const { gifts, isLoading } = useContext(GiftsContext);
	const gifts: Gift[] = [
		{
			id: 1,
			name: 'Perchero nórdico',
			price: 1000,
			imageUrl: percheroNordico,
		},
		{
			id: 2,
			name: 'Perchero nórdico',
			price: 5000,
			imageUrl: percheroNordico,
		},
		{
			id: 3,
			name: 'Perchero nórdico',
			price: 11000,
			imageUrl: percheroNordico,
		},
		{
			id: 4,
			name: 'Perchero nórdico',
			price: 20000,
			imageUrl: percheroNordico,
		},
		{
			id: 5,
			name: 'Perchero nórdico',
			price: 500000,
			imageUrl: percheroNordico,
		},
	];
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
