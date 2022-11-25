import React from 'react';
import { Link } from 'react-router-dom';
import 'bulma/css/bulma.min.css';
// TODO: Import Icon for platforms when sourced
import {
    Image,
    Button,
    Tile,
    Box,
    Heading,
} from 'react-bulma-components';

//
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
    return (
        <Box>
            <Tile kind="ancestor">
                <Tile kind="parent" vertical>
                    {/* TODO: Set max width for image */}
                    <Tile kind="child" renderAs={Image} src={game.background_image} />
                </Tile>
                <Tile size={8} vertical>
                    <Tile kind="child" size={12}>
                        <Tile kind="parent">
                            <Tile kind="child">
                                <Heading>{game.name}</Heading>
                            </Tile>
                            <Tile kind="child">
                                {/* Parent_platform.platform.name returns top-level platform
               ex: 'Xbox', 'Playstation', 'Nintendo', 'PC' etc
               TODO: Convert these Buttons to their Icons instead if possible */}
                                <Button.Group>
                                    {game.parent_platforms.map((platform) => {
                                        return <Button>{platform.name}</Button>;
                                    })}
                                </Button.Group>
                            </Tile>
                            <Tile kind="child">
                                <Button renderAs={Link} to={game.metacritic_url}>
                                    {/* TODO: Color this button based on the value of game.metcritic */}
                                    {game.metacritic}
                                </Button>
                            </Tile>
                        </Tile>
                    </Tile>
                    <Tile>
                        <Tile kind="parent" vertical>
                            <Tile kind="parent">
                                <Tile kind="child">
                                    <Button>{game.released}</Button>
                                </Tile>
                                <Tile kind="child">
                                    <Button.Group>
                                        {game.genres.map((genre) => {
                                            return <Button>{genre.name}</Button>;
                                        })}
                                    </Button.Group>
                                </Tile>
                                <Tile kind="child">
                                    <Button>{game.esrb_rating}</Button>
                                </Tile>
                            </Tile>
                            <Tile kind="child">
                                {/* TODO: Implement:
                        npmjs.com/package/react-image-gallery
                        to render each screenshot in a nice image carousel instead */}
                                {game.short_screenshots.map((screenshot) => {
                                    return <Image src={screenshot} />;
                                })}
                            </Tile>
                            <Tile kind="child">
                                <Button renderAs={Link} to={game.reddit_url}>
                                    {game.reddit_name}
                                </Button>
                            </Tile>
                            {/* <Tile kind="child"> */}
                            {/* <Button renderAs={Link} to={game.trailerlink} > */}
                            {/* TODO: Ensure we can get trailer link from API */}
                            {/* WATCH */}
                            {/* </Button> */}
                            {/* </Tile> */}
                        </Tile>
                        <Tile kind="parent">
                            <Tile kind="child">
                                <Tile kind="child">
                                    {game.description_raw}
                                </Tile>
                                <Tile kind="child">
                                    {game.stores.map((store) => {
                                        return (
                                            <Button renderAs={Link} to={store.domain}>
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
