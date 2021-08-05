import GiftCart from 'pages/GiftCart';
import Gifts from 'pages/Gifts';
import GiftTagging from 'pages/GiftTagging';
import Main from 'pages/Main';
import Transfer from 'pages/Transfer';
import Upload from 'pages/Upload';
import TransferConfirm from 'pages/TransferConfirm';
import Thanks from 'pages/Thanks';
import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

const PageRouter = (): JSX.Element => {
	const { path } = useRouteMatch();
	return (
		<Switch>
			<Route exact path={path} component={Main} />
			<Route exact path={`${path}/gifts`} component={Gifts} />
			<Route
				exact
				path={`${path}/giftTagging/:giftKind`}
				component={GiftTagging}
			/>
			<Route exact path={`${path}/giftCart`} component={GiftCart} />
			<Route exact path={`${path}/transfer`} component={Transfer} />
			<Route exact path={`${path}/transfer/confirm`} component={TransferConfirm} />
			<Route exact path={`${path}/upload/:transactionId`} component={Upload} />
			<Route exact path={`${path}/thanks`} component={Thanks} />
		</Switch>
	);
};

export default PageRouter;
