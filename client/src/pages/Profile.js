import React from 'react';
import {useQuery} from '@apollo/client';

import 'bulma/css/bulma.min.css';
import {Block, Box} from 'react-bulma-components';
import {GET_USER} from '../utils/queries';
import GamesList from '../components/GamesList';
import WishList from '../components/WishList';
import {Navigate, useParams} from 'react-router';

export default function Profile() {
    const {username} = useParams();
    const {loading, data} = useQuery(GET_USER, {variables: {username: username}});
    if (!loading && data.user === null){
        return <Navigate to="/404"/>;
    }
    const profileName = data?.user.username || null;
    const wishList = data?.user.wishList || [];
    const games = data?.user.savedGames || [];
    
    return (
        <Box>
            {loading ? <div>Loading...</div> :
                <Block>
                    <h1>{profileName}'s Profile </h1>
                    { wishList.length !== 0 ? <WishList games={wishList} heroHeader={"Wishlist"}></WishList> :
                    null}
                    
                    <GamesList games={games} heroHeader={"Saved Games"}></GamesList>
                </Block>
            }
        </Box>
    );
}