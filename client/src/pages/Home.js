import React from 'react';

//Import React BulmaUI components to build page
import 'bulma/css/bulma.min.css';

//Components used on this page
import {useFetch} from 'react-async';
import {Box} from 'react-bulma-components';
import GamesList from '../components/GamesList';

// Home will show the top 5 most popular Genres and their games
// by passing those props through the GamesList (and Game) component
export default function Home() {

    const API_KEY = process.env.REACT_APP_API_KEY;
    const id = 1;
    const page = 1;
    const {
        data,
        error
    } = useFetch(`https://api.rawg.io/api/games?page_size=6&genres=${id}&page=${page}&key=${API_KEY}`, {headers: {accept: 'application/json'}});

    const displayGenre = () => {
        if (error) {
            return error.message;
        }
        if (data) {
            console.log(data.results);
            return data.results;
        }
        return null;
    };

    return (
        <Box className="container">
            {/** TODO: pass props for popular games */}
            <GamesList games={displayGenre()} heroHeader="Popular"/>
            {/** TODO: pass Action props */}
            <GamesList games={displayGenre()} heroHeader="Action"/>
            {/** TODO: pass Sports props */}
            <GamesList games={displayGenre()} heroHeader="Sports"/>
            {/** TODO: pass Strategy props */}
            <GamesList games={displayGenre()} heroHeader="Strategy"/>
            {/** TODO: pass Role-Playing props */}
            <GamesList games={displayGenre()} heroHeader="Role-Playing"/>
        </Box>
    );
}