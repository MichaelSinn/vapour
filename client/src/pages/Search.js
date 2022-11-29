import React from "react";

//Import React BulmaUI components to build page
import "bulma/css/bulma.min.css";

//Components used on this page
import { useFetch } from "react-async";
import { Box } from "react-bulma-components";
import GamesList from "../components/GamesList";

import { useParams } from "react-router";

// Home will show the top 5 most popular Genres and their games
// by passing those props through the GamesList (and Game) component
export default function Search() {
  const API_KEY = process.env.REACT_APP_API_KEY;

  const { gameName } = useParams();
  console.log("search gameNames " + gameName);

  const { data, error } = useFetch(
    `https://api.rawg.io/api/games?search=${gameName}&page_size=6&exclude_stores=4,5,7,8,9,10&key=${API_KEY}`,
    { headers: { accept: "application/json" } }
  );

  const displaySearch = (genre) => {
    if (error) {
        return error.message;
    }
    if (data) {
        return data.results;
    }
    return null;
};

  return (
    <Box className="container is-fluid">
      {/** TODO: pass props for popular games */}
      <GamesList
        games={displaySearch()}
        heroHeader={`Search Results for ${gameName}`}
      />
    </Box>
  );
}
