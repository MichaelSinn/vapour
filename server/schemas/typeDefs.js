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
    
    type Query {
        me: User
        user(username: String!): User
        singleGameById(gameId: ID!): Game
        login(username: String!, password: String!): Auth
        allGames(genres: [String], title: String, tags: [String]): [Game]
    }
    
    type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth
        saveGame(gameId: ID!): User
        removeGame(gameId: ID!): User
    }
`;

module.exports = typeDefs;