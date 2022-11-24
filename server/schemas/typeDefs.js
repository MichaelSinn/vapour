const {gql} = require('apollo-server-express');

const typeDefs = gql`
    type Game {
        _id: ID
        gameId: String
        name: String
        rating: Int
        image: String
        genre: String
        storeLink: String
        description: String
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
        gameId: String
        name: String
        rating: Int
        image: String
        genre: String
        storeLink: String
        description: String
    }
    
    type Query {
        me: User
        user(username: String!): User
        singleGameById(gameId: String!): Game
        login(username: String!, password: String!): Auth
        allGames(genres: [String], title: String, tags: [String]): [Game]
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