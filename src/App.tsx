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
import Upload from 'pages/Upload';
import TransferConfirm from 'pages/TransferConfirm';
import Thanks from 'pages/Thanks';
import { CoupleProvider } from 'context/CoupleContext';
import AppContainer from 'pages/AppContainer';
import PageRouter from 'components/router/PageRouter';

function App(): JSX.Element {
	const [headerCollapsed, setHeaderCollapsed] = useState(true);
	return (
		<div className='App'>
			<GiftCartProvider>
				<TransactionProvider>
					<GiftItemsProvider>
						<CoupleProvider>
							<BrowserRouter>
								<Switch>
									<Route
										path='/:coupleSlug'
										render={() => (
											<AppContainer>
												<ScrollTop />
												<NavBar />
												<PageRouter />
											</AppContainer>
										)}
									/>
								</Switch>
							</BrowserRouter>
						</CoupleProvider>
					</GiftItemsProvider>
				</TransactionProvider>
			</GiftCartProvider>
		</div>
	);
}

export default App;
