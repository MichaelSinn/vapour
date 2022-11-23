const {gql} = require('apollo-server-express');

const typeDefs = gql`
    type Game {
        _id: ID
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
    }
    
    type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth
    }
`;

module.exports = typeDefs;