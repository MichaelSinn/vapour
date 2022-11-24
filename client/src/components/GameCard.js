import React from "react";

import "bulma/css/bulma.min.css";
// TODO: Import Icon for platforms when sourced
import { Card, Image, Button } from "react-bulma-components";

//TODO: Add eventHandling for when 'ADD' or 'VIEW' are clicked

// GameCard accepts a 'game' object prop and displays the information in a Card component
export default function GameCard({ game }) {
  return (
    <Card fluid>
      {/* API doesn't use the poster images, game.background_image is close enough */}
      <Image src={game.background_image} alt="" />

      <Card.Content>
        <Card.Header>{game.name}</Card.Header>
        <Button>
          {/* TODO: Color this button based on the value of game.metcritic*/}
          <a href={game.metacritic_url}>{game.metacritic}</a>
        </Button>
        {/* Parent_platform.platform.name returns top-level platform 
        ex: 'Xbox', 'Playstation', 'Nintendo', 'PC' etc 
        TODO: Convert these Buttons to their Icons instead if possible */}
        <Button.Group>
          {game.parent_platforms.map((platform) => {
            return <Button>{platform.name}</Button>;
          })}
        </Button.Group>
        <Button.Group>
          {/* Save game to user collection */}
          <Button>ADD</Button>
          {/* Go to this games' SingleGame.js page and view its GameDetails.js */}
          <Button>VIEW</Button>
        </Button.Group>
      </Card.Content>
    </Card>
  );
}
