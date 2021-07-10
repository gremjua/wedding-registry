import React, { useEffect } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

const ScrollTop = ({ history }: RouteComponentProps): null => {
	useEffect(() => {
		const unlisten = history.listen(() => {
			window.scrollTo(0, 0);
		});
		return () => {
			unlisten();
		};
	}, []);

	return null;
};

export default withRouter(ScrollTop);
