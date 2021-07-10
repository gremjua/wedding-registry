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

function App(): JSX.Element {
	const [headerCollapsed, setHeaderCollapsed] = useState(true);
	return (
		<div className='App'>
			<GiftCartProvider>
				<BrowserRouter>
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
								{/* <Route path='/category/:categoryId' component={ItemListContainer} />
					<Route path='/item/:itemId' component={ItemDetailContainer} />
					<Route exact path='/cart' component={Cart} />
					<Route exact path='/checkout' component={CheckOut} />
					<Route path='/order/:orderId' component={Order} /> */}
							</Switch>
						</PageContainer>
					</GiftItemsProvider>
					{/* pretzel y pretzel 3 */}
					<div>
						Icons made by{' '}
						<a href='https://www.freepik.com' title='Freepik'>
							Freepik
						</a>{' '}
						from{' '}
						<a href='https://www.flaticon.com/' title='Flaticon'>
							www.flaticon.com
						</a>
					</div>
					{/* pretzel 2 */}
					<div>
						Icons made by{' '}
						<a
							href='https://www.flaticon.com/authors/those-icons'
							title='Those Icons'
						>
							Those Icons
						</a>{' '}
						from{' '}
						<a href='https://www.flaticon.com/' title='Flaticon'>
							www.flaticon.com
						</a>
					</div>
				</BrowserRouter>
			</GiftCartProvider>
		</div>
	);
}

export default App;
