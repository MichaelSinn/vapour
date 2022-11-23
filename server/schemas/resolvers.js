const {AuthenticationError} = require('apollo-server-express');
const {User, Game} = require('../models');
const {signToken} = require('../utils/auth');

const notLoggedIn = 'You need to be logged in to do that!';

const resolvers = {
    Query: {
        allGames: async (parent, args) => {
            const searchParams = {...args};
            return await Game.find({where: searchParams});
        },
        me: async (parent, args, context) => {
            if (context.user) {
                return User.findById(context.user._id);
            }
            throw new AuthenticationError(notLoggedIn);
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
    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return {token, user};
        },
        saveGame: async (parent, args, context) =>{
            if (context.user){
                return await User.findOneAndUpdate(
                    {_id: context.user._id},
                    {$addToSet: {savedGames: args}},
                    {new: true, runValidators: true}
                );
            }
            throw new AuthenticationError(notLoggedIn);
        },
        removeGame: async (parent, args, context) =>{
            if (context.user){
                return await User.findOneAndUpdate(
                    {_id: context.user._id},
                    {$pull: {savedGames: {gameId: args.gameId}}},
                    {new: true}
                );
            }
            throw new AuthenticationError(notLoggedIn);
        }
    }
};

module.exports = resolvers;