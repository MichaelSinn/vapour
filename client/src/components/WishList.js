import React from 'react';

//Import React BulmaUI components to build page
import 'bulma/css/bulma.min.css';

//Components needed
import WishListCard from './WishListCard';

/* GamesList accepts 'games' as a prop to display a list of GameCard components
 for each 'game' passed

 GameCard expects these properties to be present in each 'game':
 game.background_image
 game.metacritic_url
 game.metacritic
 game.name
 game.parent_platforms */
export default function WishList({games, heroHeader}) {
    console.log(games);
    if (games) {
        return (
            <div>
                <h3 className="subtitle">{heroHeader}</h3>
                <div className="columns is-multiline">
                    {games.map((game) => {
                        return <WishListCard game={game}/>;
                    })}
                </div>
            </div>
        );
    }
    return null;
}
