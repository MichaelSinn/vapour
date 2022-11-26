import React from 'react';

//Import React BulmaUI components to build page
import 'bulma/css/bulma.min.css';
import { Box, Block } from 'react-bulma-components';

//Components used on this page
import GamesList from '../components/GamesList';
import {searchGenre} from '../utils/API';

// Home will show the top 5 most popular Genres and their games
// by passing those props through the GamesList (and Game) component
export default function Home() {
    const genres = searchGenre(1, 1);
    return (
        <Box>
            <Block> { /** TODO: pass props for popular genres */}
                <GamesList games={genres}></GamesList>
            </Block>
            <Block>{ /** TODO: pass props for the other genres and repeat this Block for each genre we want to display */}
                <GamesList games={genres}></GamesList>
            </Block>
            <p>Home</p>
        </Box>
    );
}