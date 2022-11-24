const {gql} = require('apollo-server-express');

const typeDefs = gql`
    type Game {
        _id: ID
        gameId: String!
        backgroundImage: String
        name: String!
        parentPlatforms: [String]
        metacriticUrl: String
        metacriticRating: Int
        released: String
        genres: [String]
        esrbRating: String
        screenshots: [String]
        redditUrl: String
        redditName: String
        description: String
        stores: [String]
    }
    
    type User {
        _id: ID
        username: String
        email: String
        savedGames: [Game]
        wishList: [Game]
    }
    
    type Auth {
        token: ID
        user: User
    }
    
    input GameInput {
        gameId: String!
        backgroundImage: String
        name: String!
        parentPlatforms: [String]
        metacriticUrl: String
        metacriticRating: Int
        released: String
        genres: [String]
        esrbRating: String
        screenshots: [String]
        redditUrl: String
        redditName: String
        description: String
        stores: [String]
    }
    
    type Query {
        me: User
        user(username: String!): User
        login(username: String!, password: String!): Auth
    }
    
    type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth
        addToLibrary(game: GameInput!): User
        removeFromLibrary(gameId: String!): User
        addToWishlist(game: GameInput!): User
        removeFromWishlist(gameId: String!): User
    }
`;

module.exports = typeDefs;