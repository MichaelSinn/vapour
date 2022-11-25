import React from "react";

import "bulma/css/bulma.min.css";
// TODO: Import Icon for platforms when sourced
import { Card, Button } from "react-bulma-components";

//TODO: Add eventHandling for when 'ADD' or 'VIEW' are clicked

// GameCard accepts a 'game' object prop and displays the information in a Card component
export default function GameCard({ game }) {
  return (
    <Card fluid>
      {/* API doesn't use the poster images, game.background_image is close enough */}
      <Card.Image size="4by3" src={game.background_image} alt="" />
      <Card.Content>
        <Card.Header>
          <Card.Header.Title>{game.name}</Card.Header.Title>
          <Card.Header.Icon>
            {/* TODO: Color this button based on the value of game.metcritic*/}
            <Button size="small" color={"primary"}>
              <a href={game.metacritic_url}>{game.metacritic}</a>
            </Button>
          </Card.Header.Icon>
        </Card.Header>
        {/* Parent_platform.platform.name returns top-level platform
        ex: 'Xbox', 'Playstation', 'Nintendo', 'PC' etc
        TODO: Convert these Buttons to their Icons instead if possible */}
        <Button.Group>
          {game.parent_platforms.map((platform) => {
            return (
              <Button size="small" color={"dark"}>
                {platform.name}
              </Button>
            );
          })}
        </Button.Group>
        <Card.Footer>
          {/* Save game to user collection */}
          <Card.Footer.Item>
          <Button color={"success"}>ADD</Button>
          </Card.Footer.Item>
          {/* Go to this games' SingleGame.js page and view its GameDetails.js */}
          <Card.Footer.Item>
          <Button color={"info"}>VIEW</Button></Card.Footer.Item>
        </Card.Footer>
      </Card.Content>
    </Card>
  );
}
