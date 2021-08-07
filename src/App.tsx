import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NavBar from 'components/navBar';
import { GiftCartProvider } from 'context/GiftCartContext';
import { GiftItemsProvider } from 'context/GiftItemsContext';
import ScrollTop from 'components/router/ScrollTop';
import { TransactionProvider } from 'context/TransactionContext';
import { CoupleProvider } from 'context/CoupleContext';
import AppContainer from 'pages/AppContainer';
import PageRouter from 'components/router/PageRouter';

function App(): JSX.Element {
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
										render={match => {
											const collapse = match.match.isExact;
											return (
												<AppContainer>
													<ScrollTop />
													<NavBar collapse={collapse} />
													<PageRouter />
												</AppContainer>
											);
										}}
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
