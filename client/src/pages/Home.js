import React, {useEffect} from 'react';

//Import React BulmaUI components to build page
import 'bulma/css/bulma.min.css';

//Components used on this page
import {searchGenre} from '../utils/API';
import {useFetch} from 'react-async';
import {Block, Box} from 'react-bulma-components';
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
    }

    return (
        <Box>
            <Block> { /** TODO: pass props for popular genres */}
                <GamesList games={displayGenre()}></GamesList>
            </Block>
            <Block>{ /** TODO: pass props for the other genres and repeat this Block for each genre we want to display */}
                <GamesList games={displayGenre()}></GamesList>
            </Block>
            <p>Home</p>
        </Box>
    );
}