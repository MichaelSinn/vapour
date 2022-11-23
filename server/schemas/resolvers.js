const {AuthenticationError} = require('apollo-server-express');
const {User, Game} = require('../models');

const resolvers = {
    Query: {
        allGames: async (parent, args) => {
            const searchParams = {...args};
            return await Game.find({where: searchParams});
        },
        me: async (parent, args, context) => {
            if (context.user) {
                return User.findById(context.user.id);
            }
            throw new AuthenticationError('You need to be logged in to do that!');
        },
        user: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({where: {username: args.username}});
            }
        },
        singleGameById: async (parent, args) => {
            return await Game.findById(args.id);
        }
    },
    Mutation: {}
};

module.exports = resolvers;