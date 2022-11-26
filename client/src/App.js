import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {ApolloClient, ApolloProvider, createHttpLink, InMemoryCache,} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';

// Import Nav component to route users across pages
import Nav from './components/Nav';

//Import Pages
import Home from './pages/Home';
import NewNav from './components/NewNav';
import SingleGame from './pages/SingleGame';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import Genre from './pages/Genre';
import NoMatch from './pages/NoMatch';

const httpLink = createHttpLink({
    uri: '/graphql',
});

const authLink = setContext((_, {headers}) => {
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

const genres = [
    {name: 'Action', id: 4},
    {name: 'Indie', id: 51},
    {name: 'Adventure', id: 3},
    {name: 'RPG', id: 5},
    {name: 'Strategy', id: 10},
    {name: 'Shooter', id: 2},
    {name: 'Casual', id: 40},
    {name: 'Simulation', id: 14},
    {name: 'Puzzle', id: 7},
    {name: 'Arcade', id: 11},
    {name: 'Platformer', id: 83},
    {name: 'Racing', id: 1},
    {name: 'Sports', id: 15},
    {name: 'Fighting', id: 6},
    {name: 'Family', id: 19},
    {name: 'BoardGames', id: 28}
];

function App() {
    return (
        <ApolloProvider client={client}>
            <Router>
                <NewNav genres={genres} gameCount={1} userID={1}/>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/signup" element={<Signup/>}/>
                    <Route path="/profile/:userId" element={<Profile/>}/>
                    <Route path="/:gameId" element={<SingleGame/>}/>
                    <Route path="/genres/:genreId" element={<Genre/>}/>
                    <Route path="*" element={<NoMatch/>}/>
                </Routes>
            </Router>
        </ApolloProvider>
    );
}

export default App;
