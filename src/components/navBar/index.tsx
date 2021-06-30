import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Collapse from '@material-ui/core/Collapse';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ElevationScroll from 'components/navBar/ElevationScroll';
import Fab from '@material-ui/core/Fab';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import ScrollTop from 'components/navBar/ScrollTop';
import headerImage from 'images/juanYSol.jpg';
import pretzel from 'images/pretzel3.svg';
import './index.css';

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
				<AppBar position={collapse ? 'relative' : 'fixed'}>
					{/* here we should remove position and see how material ui does with padding etc */}
					<Box className='headerContainer'>
						<Toolbar>
							<Typography variant='h6'>Juan & Sol</Typography>
						</Toolbar>
						<Collapse in={collapse}>
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
					<KeyboardArrowUpIcon />
				</Fab>
			</ScrollTop>
		</>
	);
};

export default NavBar;
