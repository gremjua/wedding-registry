import React, { useContext } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Collapse from '@material-ui/core/Collapse';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ElevationScroll from 'components/navBar/ElevationScroll';
import Fab from '@material-ui/core/Fab';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
import ScrollTop from 'components/navBar/ScrollTop';
import './index.css';
import { CoupleContext } from 'context/CoupleContext';
import { useRouteMatch } from 'react-router-dom';
import GiftCartWidget from './GiftCartWidget';

type NavBarProps = {
	/**
	 * Injected to work in an iframe.
	 */
	window?: () => Window;
	children?: React.ReactElement;
};

const NavBar = (props: NavBarProps): JSX.Element => {
	const { getCouple } = useContext(CoupleContext);
	const { headerImgUrl, title, slug } = getCouple() || {};
	const { path } = useRouteMatch();
	const isMainCouplePage = path.split('/').length === 2; // path === /:coupleSlug
	return (
		<>
			<div id='back-to-top-anchor' />
			<ElevationScroll {...props}>
				<AppBar position={isMainCouplePage ? 'relative' : 'sticky'}>
					<Box className='headerContainer'>
						<Toolbar style={{ width: '100%' }}>
							<Typography variant='h6' align='center' style={{ width: '100%' }}>
								{title}
							</Typography>
							<GiftCartWidget slug={slug || ''} />
						</Toolbar>

						<Collapse in={isMainCouplePage}>
							<Box className='headerImageContainer'>
								<img src={headerImgUrl} alt={title} className='headerImage' />
							</Box>
						</Collapse>
						<Box className='logoContainer'>
							<img src='/images/pretzel2.svg' alt='Pretzel' className='logo' />
						</Box>
					</Box>
				</AppBar>
			</ElevationScroll>
			<ScrollTop {...props}>
				<Fab color='primary' size='small' aria-label='scroll back to top'>
					<FontAwesomeIcon icon={faChevronUp} size='lg' />
				</Fab>
			</ScrollTop>
		</>
	);
};

export default NavBar;
