import { gql } from '@apollo/client';

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_GAME =  gql`
    mutation addToLibrary($gameId: String!) {
        addToLibrary(gameId: $gameId){
            token
            game{
                _id: ID
                gameId: String
                name: String
                rating: Int
                image: String
                genre: String
                storeLink: String
                description: String
            }
        }
    }`

export const REMOVE_GAME = gql`
    mutation removeFromLibrary($gameId: String!){
        removeFromLibrary(gameId: $gameId){
            token 
            game{
                _id: ID
                gameId: String
                name: String
                rating: Int
                image: String
                genre: String
                storeLink: String
                description: String
            }
        }
    }`

export const ADD_WISH = gql`
    mutation addToWishlist($gameId: String!){
        addToWishlist(gameId: $gameId){
            token
            game{
                _id: ID
                gameId: String
                name: String
                rating: Int
                image: String
                genre: String
                storeLink: String
                description: String
            }
        }
    }`

export const REMOVE_WISH = gql`
    mutation removeFromWishlist($gameId: String!){
        removeFromWishlist(gameId: $gameId){
            token
            game{
                _id: ID
                gameId: String
                name: String
                rating: Int
                image: String
                genre: String
                storeLink: String
                description: String
            }
        }
    }`