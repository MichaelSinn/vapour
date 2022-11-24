import { gql } from '@apollo/client';

export const GET_ME  = gql`
    query me {
        User {
        _id: ID
        username: String
        email: String
        savedGames: {
            gameId
            name
            rating
            image
        }
        wishList: {
            gameId
            name
            rating
            image
        }
        }
    }`

export const GET_ALL_GAMES = gql`
    query allGames {
        Game {
            gameId
            name
            rating
            image
        }
    }`

export const GET_SINGLEGAME = gql`
    query singleGame($gameId = String) {
        Game {
        gameId: String
        name: String
        rating: Int
        image: String
        genre: String
        storeLink: String
        description: String
        }
    }`

export const GET_USER = gql`
    query findUser($username: String) {
        username: String
        savedGames: {
            gameId
            name
            rating
            image
        }
        wishList: {
            gameId
            name
            rating
            image
        }
    }`
