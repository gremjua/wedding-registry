import React from 'react';
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
import headerImage from 'images/juanYSol.jpg';
import pretzel from 'images/pretzel2.svg';
import './index.css';
import GiftCartWidget from './GiftCartWidget';

type NavBarProps = {
	/**
	 * Injected to work in an iframe.
	 */
	window?: () => Window;
	children?: React.ReactElement;
	collapse: boolean;
};

const NavBar = (props: NavBarProps): JSX.Element => {
	const { collapse } = props;
	return (
		<>
			<div id='back-to-top-anchor' />
			<ElevationScroll {...props}>
				<AppBar position={!collapse ? 'relative' : 'sticky'}>
					<Box className='headerContainer'>
						<Toolbar style={{ width: '100%' }}>
							<Typography variant='h6' align='center' style={{ width: '100%' }}>
								Juan & Sol
							</Typography>
							<GiftCartWidget />
						</Toolbar>

						<Collapse in={!collapse}>
							<Box className='headerImageContainer'>
								<img src={headerImage} alt='Juan and Sol' className='headerImage' />
							</Box>
						</Collapse>
						<Box className='logoContainer'>
							<img src={pretzel} alt='Pretzel' className='logo' />
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
