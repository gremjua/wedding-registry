import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import ElevationScroll from 'components/navBar/ElevationScroll';
import Fab from '@material-ui/core/Fab';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import ScrollTop from 'components/navBar/ScrollTop';

interface Props {
	/**
	 * Injected to work in an iframe.
	 */
	window?: () => Window;
	children?: React.ReactElement;
}

const NavBar = (props: Props): JSX.Element => (
	<>
		<ElevationScroll {...props}>
			<AppBar>
				<Toolbar>
					<Typography variant='h6'>Scroll to Elevate App Bar</Typography>
				</Toolbar>
			</AppBar>
		</ElevationScroll>
		<Toolbar id='back-to-top-anchor' />
		<Container>
			<Box my={2}>
				{[...new Array(12)]
					.map(
						() => `Cras mattis consectetur purus sit amet fermentum.
Cras justo odio, dapibus ac facilisis in, egestas eget quam.
Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`
					)
					.join('\n')}
			</Box>
		</Container>
		<ScrollTop {...props}>
			<Fab color='secondary' size='small' aria-label='scroll back to top'>
				<KeyboardArrowUpIcon />
			</Fab>
		</ScrollTop>
	</>
);

export default NavBar;
