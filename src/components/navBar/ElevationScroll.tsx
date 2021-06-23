import { useScrollTrigger } from '@material-ui/core';
import * as React from 'react';

interface Props {
	/**
	 * Injected to work in an iframe.
	 */
	window?: () => Window;
	children: React.ReactElement;
}

const ElevationScroll = (props: Props): JSX.Element => {
	const { children, window } = props;
	// Note that you normally won't need to set the window ref as useScrollTrigger
	// will default to window.
	// This is only being set here because the demo is in an iframe.
	const trigger = useScrollTrigger({
		disableHysteresis: true,
		threshold: 0,
		target: window ? window() : undefined,
	});

	return React.cloneElement(children, {
		elevation: trigger ? 4 : 0,
	});
};

export default ElevationScroll;
