import React, { useState } from 'react';

import { useMutation, useQuery } from '@apollo/client';
import { ADD_GAME, REMOVE_GAME } from '../utils/mutations'

import Auth from '../utils/auth'

import 'bulma/css/bulma.min.css';
// TODO: Import Icon for platforms when sourced
import {Button, Card, Icon} from 'react-bulma-components';
import {platform} from '../utils/switch-functions';
import GamesList from './GamesList';
import { Link } from 'react-router-dom';
import { GET_ME } from '../utils/queries';

//TODO: Add eventHandling for 'DELETE'

// GameCard accepts a 'game' object prop and displays the information in a Card component
export default function GameCard({game}) {

  const [addToLibrary, { error }] = useMutation(ADD_GAME)
  const [removeFromLibrary] = useMutation(REMOVE_GAME)

  const handleGameAddition = async (event) => {
    event.preventDefault();
    try {
      const { data } = await addToLibrary({
        variables: {
          Game: {
              backgroundImage: game.background_image,
              name: game.name,
              metacriticRating: game.metacritic,
              gameId: game.id
          }
        }
      });

    } catch (e) {
      console.error(e);
    }
  }

  const handleGameDeletion = async (event) => {
    try {
      console.log(game.gameId)
      const { data } = await removeFromLibrary({
        variables: {
          gameId: game.gameId
        }
      })
    }catch (e) {
      console.error(e);
  }
}

    var scoreColor = '';
    switch (true) {
    case game.metacritic > 75 || game.metacriticRating > 75:
        scoreColor = 'primary';
        break;
    case (game.metacritic <= 75 && game.metacritic >= 60)  || (game.metacriticRating <= 75 && game.metacriticRating >= 60) :
        scoreColor = 'warning';
        break;
    case game.metacritic < 60 || game.metacriticRating < 60:
        scoreColor = 'danger';
        break;
    default:
        break;
    }
    return (
        <div className="column is-2">
            <Card fluid>
                {/* API doesn't use the poster images, game.background_image is close enough */}
                <Card.Image size="4by3" src={game.background_image || game.backgroundImage} alt=""/>
                <Card.Content>
                    <Card.Header>
                        <Card.Header.Title>{game.name}</Card.Header.Title>
                        <Card.Header.Icon>
                            {/* TODO: Color this button based on the value of game.metcritic*/}
                            <Button size="small" color={scoreColor}>
                              {game.metacritic || game.metacriticRating}
                            </Button>
                        </Card.Header.Icon>
                    </Card.Header>
                    {/* Parent_platform.platform.name returns top-level platform
        ex: 'Xbox', 'Playstation', 'Nintendo', 'PC' etc
        TODO: Convert these Buttons to their Icons instead if possible */}
                    <Button.Group>
                        {game.parent_platforms ? game.parent_platforms.map((item) => {
                            if (platform(item.platform.id)){
                                return (
                                    <Icon className="m-2" renderAs="img" src={platform(item.platform.id)}/>
                                );
                            }
                            return null;
                        }): null}
                    </Button.Group>
                    <Card.Footer>
                        {/* Save game to user collection */}
                        <Card.Footer.Item>
                          <Button color={'danger'} onClick={handleGameDeletion}>Delete</Button>
                          <Button color={'success'} onClick={handleGameAddition}>ADD</Button>
                        </Card.Footer.Item>
                        {/* Go to this games' SingleGame.js page and view its GameDetails.js */}
                        <Card.Footer.Item>
                          <Link to={`/${game.id}`}>
                            <Button color={'info'} type='button' >VIEW</Button>
                            </Link>
                        </Card.Footer.Item>
                    </Card.Footer>
                </Card.Content>
            </Card>
        </div>
    );
}

