import {
	Box,
	Card,
	CardActionArea,
	CardContent,
	CardMedia,
	Grow,
	Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { GiftCartContext } from 'context/GiftCartContext';
import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGift } from '@fortawesome/free-solid-svg-icons';
import GoToCartButton from 'components/common/GoToCartButton';
import numberToPriceString from 'utils/price';
import { Gift } from './types';

const useStyles = makeStyles({
	root: {
		position: 'relative',
	},
	action: {
		display: 'flex',
		justifyContent: 'flex-start',
		alignContent: 'center',
		flexDirection: 'column',
		height: '280px',
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
	const { addGiftToCart, isInCart } = useContext(GiftCartContext);

	return (
		<>
			<Grow in timeout={1000}>
				<Card
					className={classes.root}
					onClick={() => addGiftToCart(item)}
					data-cy='giftItem'
				>
					{/* If isInCart => mark as in cart */}
					<CardActionArea className={classes.action}>
						<CardMedia
							className={classes.media}
							image={item.imageUrl}
							title={item.name}
						/>
						<CardContent>
							<Typography
								gutterBottom
								variant='body1'
								component='h2'
								align='center'
								data-cy='giftItemName'
							>
								{item.name}
							</Typography>
							<Typography
								variant='subtitle1'
								color='textSecondary'
								align='center'
								data-cy='giftItemPrice'
								style={{ fontWeight: 'bolder' }}
							>
								{numberToPriceString(item.price, 'AR$')}
							</Typography>
						</CardContent>
					</CardActionArea>
					{isInCart(item) ? (
						<Box
							position='absolute'
							width='100%'
							height='100%'
							top={0}
							left={0}
							display='flex'
							justifyContent='center'
							alignItems='center'
							flexDirection='column'
							style={{ background: '#fafafa' }}
						>
							<FontAwesomeIcon icon={faGift} size='6x' />
							<GoToCartButton />
						</Box>
					) : null}
				</Card>
			</Grow>
		</>
	);
};

export default GiftItem;
