import React from "react";
import { Link } from "react-router-dom";
import "bulma/css/bulma.min.css";
// TODO: Import Icon for platforms when sourced
import { Image, Button, Tile, Box, Heading, Tag , Level} from "react-bulma-components";

// Imported library for screenshot carousel
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

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

game.trailer uses the /{gameID}/movies API endpoint: it may not exist; if so, it may have many; just get the first trailer (results[0])
*/
export default function GameDetails({ game }) {
    // Color Metacritic score button based on value
  var scoreColor = "";
  switch (game.metacritic) {
    case game.metacritic > 75:
      scoreColor = "success";
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
          {/* TODO: Set max width for image */}
          <Tile kind="child" renderAs={Image} src={game.background_image} />
        </Tile>
        <Tile size={8} vertical>
          <Tile kind="child">
            <Tile kind="parent">
              <Tile kind="child" narrow={true}>
                <Heading>{game.name}</Heading>
              </Tile>
              <Tile kind="child">
                {/* Parent_platform.platform.name returns top-level platform
               ex: 'Xbox', 'Playstation', 'Nintendo', 'PC' etc
               TODO: Convert these Buttons to their Icons instead if possible */}
                <Tag.Group>
                  {game.parent_platforms.map((platform, index) => {
                    return (
                      <Tag size="small" key={index}>
                        {platform.name}
                      </Tag>
                    );
                  })}
                </Tag.Group>
              </Tile>
              <Tile size={1}>
                <a href={game.metacritic_url}>
                  <Button size="large" color={scoreColor} outlined={false}>
                    {/* TODO: Color this button based on the value of game.metcritic */}
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
                {/* TODO: Implement: render each screenshot in a nice image carousel instead */}
                {/* {game.short_screenshots.map((screenshot) => {
                                    return ;
                                })} */}
                <Carousel showThumbs={false}>
                  {game.short_screenshots.map((image) => (
                    <div>
                      <img src={image.url} />
                    </div>
                  ))}
                </Carousel>
              </Tile>
              <Level>
                <Tile kind="child">
                  <Button to={game.reddit_url}>{game.reddit_name}</Button>
                </Tile>
                <Tile kind="child">
                  <Button renderAs={Link} to={game.trailerlink}>
                    {/* TODO: Ensure we can get trailer link from API */}
                    WATCH
                  </Button>
                </Tile>
              </Level>
            </Tile>
            <Tile kind="parent">
              <Tile kind="child">
                <Tile kind="child">{game.description_raw}</Tile>
                <Tile kind="child">
                  {game.stores.map((store, index) => {
                    return (
                      <Button to={store.domain} key={index}>
                        {store.name}
                      </Button>
                    );
                  })}
                </Tile>
                <Tile kind="child">
                  {/* TODO: use state to determine what is button should say/do */}
                  <Button>VIEW/ADD</Button>
                </Tile>
              </Tile>
            </Tile>
          </Tile>
        </Tile>
      </Tile>
    </Box>
  );
}
