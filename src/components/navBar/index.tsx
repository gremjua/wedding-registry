import React, { useContext } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Collapse from '@material-ui/core/Collapse';
import Toolbar from '@material-ui/core/Toolbar';
import Box from '@material-ui/core/Box';
import ElevationScroll from 'components/navBar/ElevationScroll';
import Fab from '@material-ui/core/Fab';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
import ScrollTop from 'components/navBar/ScrollTop';
import './index.css';
import { CoupleContext } from 'context/CoupleContext';
import GiftCartWidget from './GiftCartWidget';

type NavBarProps = {
	/**
	 * Injected to work in an iframe.
	 */
	window?: () => Window;
	collapse: boolean;
	children?: React.ReactElement;
};

const NavBar = (props: NavBarProps): JSX.Element => {
	const { getCouple } = useContext(CoupleContext);
	const { headerImgUrl, title, slug } = getCouple() || {};
	const { collapse } = props;
	return (
		<>
			<div id='back-to-top-anchor' />
			<ElevationScroll {...props}>
				<AppBar position={collapse ? 'relative' : 'sticky'}>
					<Box className='headerContainer'>
						<Toolbar style={{ width: '100%', height: '100px', overflow: 'hidden' }}>
							<img
								src='/images/pretzelsLogo2.png'
								alt='Pretzels logo'
								style={{ width: '280px', position: 'absolute', left: 0 }}
							/>
							<GiftCartWidget slug={slug || ''} />
						</Toolbar>

						<Collapse in={collapse} timeout={500}>
							<Box className='headerImageContainer'>
								<img src={headerImgUrl} alt={title} className='headerImage' />
							</Box>
						</Collapse>
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
