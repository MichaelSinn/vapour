import React from 'react';

//Import React BulmaUI components to build page
import 'bulma/css/bulma.min.css';

//Components needed
import GameCard from '../components/GameCard';
import {useQuery} from '@apollo/client';
import {GET_ME} from '../utils/queries';

/* GamesList accepts 'games' as a prop to display a list of GameCard components
 for each 'game' passed

 GameCard expects these properties to be present in each 'game':
 game.background_image
 game.metacritic_url
 game.metacritic
 game.name
 game.parent_platforms */
export default function GamesList({games, heroHeader}) {
    const {loading, data} = useQuery(GET_ME);
    console.log(data);
    if (games) {
        return (
            <div>
                {
                    loading ? <div>Loading...</div> :
                        <div>
                            <h3 className="subtitle">{heroHeader}</h3>
                            <div className="columns is-multiline">
                                {games.map((game) => {
                                    if (!data?.me.savedGames.includes(game)) {
                                        return <GameCard game={game}/>;
                                    }
                                    return null;
                                })}
                            </div>
                        </div>
                }
            </div>
        );
    }
    return null;
}
