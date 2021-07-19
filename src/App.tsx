import React, { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NavBar from 'components/navBar';
import Main from 'pages/Main';
import Gifts from 'pages/Gifts';
import GiftTagging from 'pages/GiftTagging';
import { GiftCartProvider } from 'context/GiftCartContext';
import { GiftItemsProvider } from 'context/GiftItemsContext';
import PageContainer from 'pages/PageContainer';
import GiftCart from 'pages/GiftCart';
import ScrollTop from 'components/router/ScrollTop';
import { TransactionProvider } from 'context/TransactionContext';
import Transfer from 'pages/Transfer';

function App(): JSX.Element {
	const [headerCollapsed, setHeaderCollapsed] = useState(true);
	return (
		<div className='App'>
			<GiftCartProvider>
				<TransactionProvider>
					<BrowserRouter>
						<ScrollTop />
						<NavBar collapse={headerCollapsed} />
						<GiftItemsProvider>
							<PageContainer>
								<Switch>
									<Route
										exact
										path='/'
										render={() => {
											setHeaderCollapsed(false);
											return <Main />;
										}}
									/>
									<Route
										exact
										path='/gifts'
										render={() => {
											setHeaderCollapsed(true);
											return <Gifts />;
										}}
									/>
									<Route
										exact
										path='/giftTagging/:giftKind'
										render={() => {
											setHeaderCollapsed(true);
											return <GiftTagging />;
										}}
									/>
									<Route
										exact
										path='/giftCart'
										render={() => {
											setHeaderCollapsed(true);
											return <GiftCart />;
										}}
									/>
									<Route
										exact
										path='/transfer'
										render={() => {
											setHeaderCollapsed(true);
											return <Transfer />;
										}}
									/>
								</Switch>
							</PageContainer>
						</GiftItemsProvider>
					</BrowserRouter>
				</TransactionProvider>
			</GiftCartProvider>
		</div>
	);
}

export default App;
