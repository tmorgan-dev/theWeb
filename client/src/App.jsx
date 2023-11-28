// import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header/Header';
// import Landingpage from './pages/Landing/Landingpage';
// import Mainpage from './pages/Main/Mainpage';
import Footer from './components/Footer/Footer';
import {
	ApolloClient,
	InMemoryCache,
	ApolloProvider,
	createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';


//needs appollo inports etc
import './App.css';
const httpLink = createHttpLink({
	uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
	const token = localStorage.getItem('id_token');
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : '',
		},
	};
});
const client = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache(),
});

function App() {
	return (
		
			<ApolloProvider client={client}>
				<Header />
				{/*<Landingpage />*/}
				<Outlet />
				{/*<Mainpage />*/}
				<Footer />
			</ApolloProvider>
		
	);
}

export default App;
