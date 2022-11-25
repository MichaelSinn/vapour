import React from 'react';

//Import React BulmaUI components to build page
import 'bulma/css/bulma.min.css';
import { Box } from 'react-bulma-components';

//Components used on this page
import GameDetails from '../components/GameDetails';

/*
 SingleGame will display the advanced details of the passed game.
 GameDetails expects:
 background_image
 name
 metacritic_url
 metacritic
 parent_platforms
 released
 genres
 esrb_rating
 screenshot
 reddit_url
 reddit_name
*/
export default function SingleGame({ game }) {
    return (
        <Box>
            <GameDetails game={game}></GameDetails>
        </Box>
    );
}
