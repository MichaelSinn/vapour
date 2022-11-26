import React from "react";

//Import React BulmaUI components to build page
import "bulma/css/bulma.min.css";
import { Columns, Hero, Container } from "react-bulma-components";

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
export default function GamesList({ games }, heroHeader) {
  console.log(games);
  if (games) {
    return (
      <Hero>
        <Hero.Body>
          <Container>
            <Hero.Header>{heroHeader}</Hero.Header>
            <Columns gap={1}>
              <Columns.Column size={3}>
                {games.map((game) => {
                  return <GameCard game={game} />;
                })}
              </Columns.Column>
            </Columns>
          </Container>
        </Hero.Body>
      </Hero>
    );
  }
  return null;
}
