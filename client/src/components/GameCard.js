import React, { useState } from 'react';

import { useMutation } from '@apollo/client';
import { ADD_GAME } from '../utils/mutations'

import Auth from '../utils/auth'

import 'bulma/css/bulma.min.css';
// TODO: Import Icon for platforms when sourced
import {Button, Card, Icon} from 'react-bulma-components';
import {platform} from '../utils/switch-functions';
import GamesList from './GamesList';

//TODO: Add eventHandling for when 'ADD' or 'VIEW' are clicked

// GameCard accepts a 'game' object prop and displays the information in a Card component
export default function GameCard({game}) {

  const [addGame, setGame] = useState({game})

  const [addToLibrary, { error, data }] = useMutation(ADD_GAME)

  const handleGameAddition = async (event) => {
    event.preventDefault();
    console.log(addGame.game.id)
    console.log(addGame.game.name)
    try {
      const { data } = await addToLibrary({
        variables: {
              // backgroundImage: game.background_image,
              // name: addGame.game.name,
              // parentPlatforms: game.parent_platforms.platform,
              // metacriticUrl: game.metacritic_url,
              // metacriticRating: game.metacritic,
              // released: game.released,
              // genres: game.genres.id,
              // esrbRating: game.esrb_rating,
              // screenshots: game.short_screenshots,
              // redditUrl: game.reddit_url,
              // redditName: game.reddit_name,
              // description: game.description,
              // stores: game.stores,
              // gameId: addGame.game.id
        }
      })

    } catch (e) {
      console.error(e);
    }
  }

    var scoreColor = '';
    switch (true) {
    case game.metacritic > 75:
        scoreColor = 'primary';
        break;
    case game.metacritic <= 75 && game.metacritic >= 60:
        scoreColor = 'warning';
        break;
    case game.metacritic < 60:
        scoreColor = 'danger';
        break;
    default:
        break;
    }
    return (
        <div className="column">
            <Card fluid>
                {/* API doesn't use the poster images, game.background_image is close enough */}
                <Card.Image size="4by3" src={game.background_image} alt=""/>
                <Card.Content>
                    <Card.Header>
                        <Card.Header.Title>{game.name}</Card.Header.Title>
                        <Card.Header.Icon>
                            {/* TODO: Color this button based on the value of game.metcritic*/}
                            <Button size="small" color={scoreColor}>
                                <a href={game.metacritic_url}>{game.metacritic}</a>
                            </Button>
                        </Card.Header.Icon>
                    </Card.Header>
                    {/* Parent_platform.platform.name returns top-level platform
        ex: 'Xbox', 'Playstation', 'Nintendo', 'PC' etc
        TODO: Convert these Buttons to their Icons instead if possible */}
                    <Button.Group>
                        {game.parent_platforms.map((item) => {
                            // console.log(item);
                            if (platform(item.platform.id)){
                                return (
                                    <Icon className="m-2" renderAs="img" src={platform(item.platform.id)}/>
                                );
                            }
                            return null;
                        })}
                    </Button.Group>
                    <Card.Footer>
                        {/* Save game to user collection */}
                        <Card.Footer.Item>
                            <Button color={'success'} onClick={handleGameAddition}>ADD</Button>
                        </Card.Footer.Item>
                        {/* Go to this games' SingleGame.js page and view its GameDetails.js */}
                        <Card.Footer.Item>
                            <Button color={'info'}>VIEW</Button>
                        </Card.Footer.Item>
                    </Card.Footer>
                </Card.Content>
            </Card>
        </div>
    );
}
