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
    mutation Mutation($Game: GameInput!) {
      addToLibrary(game: $Game) {
        email
        username
        savedGames {
          _id
        }
      }
    }
`;

export const REMOVE_GAME = gql`
    mutation RemoveFromLibrary($gameId: Int!) {
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
    mutation addToWishlist($Game: GameInput!) {
      addToWishlist(game: $Game) {
        email
        username
        wishList {
          _id
        }
      }
    }
`;

export const REMOVE_WISH = gql`
    mutation removeFromWishlist($gameId: Int!) {
      removeFromWishlist(gameId: $gameId) {
        email
        username
        wishList {
          _id
        }
      }
    }
`;