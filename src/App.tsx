import React, { useState } from 'react';
import logo from 'logo.svg';
import 'App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NavBar from 'components/navBar';
import Button from '@material-ui/core/Button';
import Main from 'pages/Main';

function App(): JSX.Element {
	const [headerCollapsed, setHeaderCollapsed] = useState(true);
	const collapseHeader = () => setHeaderCollapsed(!headerCollapsed);
	return (
		<div className='App'>
			<BrowserRouter>
				<NavBar collapse={headerCollapsed} />
				<Switch>
					<Route exact path='/' component={Main} />
					{/* <Route path='/category/:categoryId' component={ItemListContainer} />
					<Route path='/item/:itemId' component={ItemDetailContainer} />
					<Route exact path='/cart' component={Cart} />
					<Route exact path='/checkout' component={CheckOut} />
					<Route path='/order/:orderId' component={Order} /> */}
				</Switch>
				<Button onClick={collapseHeader}>Collapse</Button>
				<div className='App-header'>
					<img src={logo} className='App-logo' alt='logo' />
					<p>
						Edit <code>src/App.tsx</code> and save to reload.
					</p>
					<a
						className='App-link'
						href='https://reactjs.org'
						target='_blank'
						rel='noopener noreferrer'
					>
						Learn React
					</a>
					<img src={logo} className='App-logo' alt='logo' />
					<p>
						Edit <code>src/App.tsx</code> and save to reload.
					</p>
					<a
						className='App-link'
						href='https://reactjs.org'
						target='_blank'
						rel='noopener noreferrer'
					>
						Learn React
					</a>
					<img src={logo} className='App-logo' alt='logo' />
					<p>
						Edit <code>src/App.tsx</code> and save to reload.
					</p>
					<a
						className='App-link'
						href='https://reactjs.org'
						target='_blank'
						rel='noopener noreferrer'
					>
						Learn React
					</a>
				</div>
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
					<a href='https://www.flaticon.com/authors/those-icons' title='Those Icons'>
						Those Icons
					</a>{' '}
					from{' '}
					<a href='https://www.flaticon.com/' title='Flaticon'>
						www.flaticon.com
					</a>
				</div>
			</BrowserRouter>
		</div>
	);
}

export default App;
