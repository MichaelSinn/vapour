import { gql } from '@apollo/client';

export const LOGIN = gql`
    query Login($username: String!, $password: String!) {
      login(username: $username, password: $password) {
        token
        user {
          _id
          email
          username
        }
      }
    }
`;

export const GET_ME = gql`
    query Me {
      me {
        _id
        email
        username
        wishList {
          _id
          backgroundImage
          description
          esrbRating
          gameId
          genres
          metacriticRating
          name
          metacriticUrl
          parentPlatforms
          redditName
          redditUrl
          released
          screenshots
          stores
        }
        savedGames {
          _id
          backgroundImage
          description
          esrbRating
          gameId
          genres
          metacriticRating
          metacriticUrl
          name
          parentPlatforms
          redditName
          redditUrl
          released
          screenshots
          stores
        }
      }
    }
`;

export const GET_USER = gql`
    query User($username: String!) {
      user(username: $username) {
        email
        username
        savedGames {
          _id
          backgroundImage
          description
          esrbRating
          gameId
          genres
          metacriticRating
          metacriticUrl
          name
          parentPlatforms
          redditUrl
          redditName
          released
          screenshots
          stores
        }
        wishList {
          _id
          backgroundImage
          esrbRating
          description
          gameId
          genres
          metacriticRating
          metacriticUrl
          name
          parentPlatforms
          redditName
          redditUrl
          released
          screenshots
          stores
        }
      }
    }
`;
