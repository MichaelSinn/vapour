import { gql } from '@apollo/client';

export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
      addUser(username: $username, email: $email, password: $password) {
        token
        user {
          username
          email
          _id
        }
      }
    }
`;

export const ADD_GAME = gql`
    mutation Mutation($game: GameInput!) {
      addToLibrary(game: $game) {
        email
        username
        savedGames {
          _id
        }
      }
    }
`;

export const REMOVE_GAME = gql`
    mutation RemoveFromLibrary($gameId: String!) {
      removeFromLibrary(gameId: $gameId) {
        email
        username
        savedGames {
          _id
        }
      }
    }
`;

export const ADD_WISH = gql`
    mutation addToWishlist($game: GameInput!) {
      addToWishlist(game: $game) {
        email
        username
        wishList {
          _id
        }
      }
    }
`;

export const REMOVE_WISH = gql`
    mutation removeFromWishlist($gameId: String!) {
      removeFromWishlist(gameId: $gameId) {
        email
        username
        wishList {
          _id
        }
      }
    }
`;