import { Grid } from '@material-ui/core';
import React from 'react';
import { Gift } from './types';
import GiftItem from './GiftItem';

type Props = {
	gifts: Gift[];
};

const GiftItemList = (props: Props): JSX.Element => {
	const { gifts } = props;
	return (
		<Grid
			container
			direction='row'
			alignItems='center'
			spacing={3}
			style={{ minWidth: 300 }}
		>
			{gifts.map(gift => (
				<Grid key={gift.id} item xs={6} sm={4} data-cy={`giftItemCell-${gift.id}`}>
					<GiftItem item={gift} />
				</Grid>
			))}
		</Grid>
	);
};

export default GiftItemList;
