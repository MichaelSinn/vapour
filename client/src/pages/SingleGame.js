import React from "react";

//Import React BulmaUI components to build page
import "bulma/css/bulma.min.css";
import { Box } from "react-bulma-components";

//Components used on this page
import GameDetails from "../components/GameDetails";

import { useFetch } from "react-async";
import { useParams } from "react-router";

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
export default function SingleGame() {
  const { gameId } = useParams();
  const API_KEY = process.env.REACT_APP_API_KEY;

  const { data, error } = useFetch(
    `https://api.rawg.io/api/games/${gameId}?page_size=1&page=1&key=${API_KEY}`,
    { headers: { accept: "application/json" } }
  );
  console.log(data);

  return (
    <Box>
      <GameDetails game={data} />
    </Box>
  );
}
