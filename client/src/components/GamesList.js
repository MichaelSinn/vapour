import React from "react";

//Import React BulmaUI components to build page
import "bulma/css/bulma.min.css";
import { Card } from "react-bulma";

//Components needed
import GameCard from "../components/GameCard";

/* GamesList accepts 'games' as a prop to display a list of GameCard components
 for each 'game' passed
 
 GameCard expects these properties to be present in each 'game': 
 game.background_image
 game.metacritic_url
 game.metacritic
 game.name
 game.parent_platforms */
export default function GamesList(games) {
  return (
    <Card.Group>
      {games.map((game) => {
        return <GameCard game={game} />;
      })}
    </Card.Group>
  );
}