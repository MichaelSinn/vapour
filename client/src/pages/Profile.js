import React from 'react';
import { useQuery } from '@apollo/client';

import 'bulma/css/bulma.min.css';
import { Box, Block } from 'react-bulma-components';
import { GET_ME } from '../utils/queries'
import GamesList from '../components/GamesList';
import WishList from '../components/Wishlist';

export default function Profile () {
    const { loading, data } = useQuery(GET_ME)
    const username = data?.me.username
    const savedGames = data?.me.savedGames
    const wishList = data?.me.wishList
    return (
        <Box>
            <Block> 
                <h2>{username}'s Profile </h2>
                <WishList list={wishList}></WishList>
                <GamesList games={savedGames}></GamesList>
            </Block>
        </Box>
    )
}