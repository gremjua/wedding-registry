import {
	Box,
	Card,
	CardActionArea,
	CardContent,
	CardMedia,
	Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { Gift } from './types';

const useStyles = makeStyles({
	root: {},
	action: {
		display: 'flex',
		alignContent: 'center',
		flexDirection: 'column',
	},
	media: {
		height: '140px',
		width: '140px',
	},
});

type Props = {
	item: Gift;
};

const GiftItem = (props: Props): JSX.Element => {
	const { item } = props;
	const classes = useStyles();
	return (
		<Card>
			{/* If isInCart => mark as in cart */}
			<CardActionArea className={classes.action}>
				<CardMedia
					className={classes.media}
					image={item.imageUrl}
					title={item.name}
				/>
				<CardContent>
					<Typography gutterBottom variant='body1' component='h2' align='center'>
						{item.name}
					</Typography>
					<Typography variant='subtitle1' color='textSecondary' align='center'>
						{`AR$ ${item.price}`}
					</Typography>
				</CardContent>
			</CardActionArea>
		</Card>
	);
};

export default GiftItem;
