import React from 'react';
import {useQuery} from '@apollo/client';

import 'bulma/css/bulma.min.css';
import {Block, Box} from 'react-bulma-components';
import {GET_USER} from '../utils/queries';
import GamesList from '../components/GamesList';
import WishList from '../components/Wishlist';
import {useParams} from 'react-router';

export default function Profile() {
    const {username} = useParams();
    console.log(username);
    const {loading, data} = useQuery(GET_USER, {variables: {username: username}});
    const profileName = data?.user.username;
    const wishList = data?.user.wishList;
    const savedGames = data?.user.savedGames;
    console.log(data);
    return (
        <Box>
            {loading ? <div>Loading...</div> :
                <Block>
                    <h2>{profileName}'s Profile </h2>
                    <WishList list={wishList}></WishList>
                    <GamesList games={savedGames}></GamesList>
                </Block>
            }
        </Box>
    );
}