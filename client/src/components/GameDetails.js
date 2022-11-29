import React from "react";
import { Link } from "react-router-dom";
import "bulma/css/bulma.min.css";
// TODO: Import Icon for platforms when sourced
import {
  Image,
  Button,
  Tile,
  Box,
  Heading,
  Tag,
  Level,
  Icon,
} from "react-bulma-components";

import { useMutation } from '@apollo/client';
// Imported library for screenshot carousel
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import { useFetch } from "react-async";

import { useParams } from "react-router";
import { platform, store } from "../utils/switch-functions";

import Auth from "../utils/auth";
import GamesList from "./GamesList";


import { ADD_GAME, ADD_WISH } from '../utils/mutations'


/* GameDetails accepts a 'game' object prop and displays the information in a Box component
GameDetails expects:
game.background_image
game.name
game.parent_platforms
game.metacritic_url
game.metacritic
game.released
game.genres
game.esrb_rating.name
game.short_screenshots
game.reddit_url
game.reddit_name
game.description_raw
game.stores
*/

export default function GameDetails({ game }) {
  const [addToLibrary] = useMutation(ADD_GAME)
  const [addToWishlist] = useMutation(ADD_WISH)

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

  const handleWishAddition = async (event) => {
    event.preventDefault();
    try {
      const { data } = await addToWishlist({
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

  const { gameId } = useParams();
  const API_KEY = process.env.REACT_APP_API_KEY;

  // Fetch request for screenshots
  const { data, error } = useFetch(
    `https://api.rawg.io/api/games/${gameId}/screenshots?key=${API_KEY}`,
    { headers: { accept: "application/json" } }
  );

  if (!game) return null; // Stop app from crashing while API info is still getting populated
  // Color Metacritic score button based on value
  var scoreColor = "";
  switch (true) {
    case game.metacritic > 75:
      scoreColor = "primary";
      break;
    case game.metacritic <= 75 && game.metacritic >= 60:
      scoreColor = "warning";
      break;
    case game.metacritic < 60:
      scoreColor = "danger";
      break;
    default:
      break;
  }

  return (
    <Box>
      <Tile kind="ancestor">
        <Tile kind="parent" vertical>
          <Tile
            kind="child"
            renderAs={Image}
            src={game.background_image}
            size="16by9"
          />
        </Tile>
        <Tile size={8} vertical>
          <Tile kind="child">
            <Tile kind="parent">
              <Tile kind="child">
                <Heading>{game.name}</Heading>
              </Tile>
              <Tile kind="child">
                <Button.Group>
                  {game.parent_platforms.map((item) => {
                    if (platform(item.platform.id)) {
                      return (
                        <Icon
                          className="m-2"
                          renderAs="img"
                          src={platform(item.platform.id)}
                        />
                      );
                    }
                    return null;
                  })}
                </Button.Group>
              </Tile>
              <Tile size={1}>
                <a href={game.metacritic_url}>
                  <Button size="large" color={scoreColor} outlined={false}>
                    {game.metacritic}
                  </Button>
                </a>
              </Tile>
            </Tile>
          </Tile>
          <Tile>
            <Tile kind="parent" vertical>
              <Tile kind="parent">
                <Tile kind="child" size={3}>
                  <Tag size="small">Released:</Tag>
                  <Tag size="small">{game.released}</Tag>
                </Tile>
                <Tile kind="child" size={6}>
                  <Tag.Group>
                    <Tag size="small">Genres:</Tag>
                    {game.genres.map((genre, index) => {
                      return (
                        <Tag size="small" key={index}>
                          {genre.name}
                        </Tag>
                      );
                    })}
                  </Tag.Group>
                </Tile>
                <Tile kind="child" size={3}>
                  <Tag size="small">Rated:</Tag>
                  <Tag size="small">{game.esrb_rating.name}</Tag>
                </Tile>
              </Tile>

              <Tile kind="child">
                {data?.results ? (
                  <Carousel showThumbs={false}>
                    {data?.results.map((scrn, index) => (
                      <div>
                        <img src={scrn.image} key={index} alt="" />
                      </div>
                    ))}
                  </Carousel>
                ) : null}
              </Tile>
              {game.reddit_url ? 
              (<Tile kind="child">
                
                <a href={game.reddit_url}>
                  <Button>{game.reddit_name}</Button>
                </a>
                
              </Tile>) : null
              }
            </Tile>
            <Tile kind="parent">
              <Tile kind="child">
                <Tile kind="child">{game.description_raw}</Tile>
                <Tile kind="child">
                  {game.stores.map((item) => {
                    if (store(item.store.id)) {
                      return (
                        <a href={`https://${item.store.domain}`}>
                          <Button src={store(item.store.id)}>
                            {item.store.name}
                          </Button>
                        </a>
                      );
                    }
                    return null;
                  })}
                </Tile>
                <Tile kind="child">
                  {Auth.loggedIn() ? (
                    <Button.Group>
                      <Button fullwidth colorVariant={"success"} onClick={handleGameAddition}> 
                        ADD
                      </Button>
                      <Button fullwidth colorVariant={"info"} onClick={handleWishAddition}>
                        WISHLIST
                      </Button>
                    </Button.Group>
                  ) : (
                    <Button fullwidth disabled colorVariant={"light"}>
                      Login or Sign up to add game
                    </Button>
                  )}
                </Tile>
              </Tile>
            </Tile>
          </Tile>
        </Tile>
      </Tile>
    </Box>
  );
}
