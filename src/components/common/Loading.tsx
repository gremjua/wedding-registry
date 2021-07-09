import { Box, CircularProgress } from '@material-ui/core';
import React from 'react';

const Loading = (): JSX.Element => (
	<Box
		my='20px'
		display='flex'
		width='100%'
		height='40vh'
		alignItems='center'
		justifyContent='center'
	>
		<CircularProgress />
	</Box>
);

export default Loading;
