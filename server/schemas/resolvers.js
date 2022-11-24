const {AuthenticationError} = require('apollo-server-express');
const {User, Game} = require('../models');
const {signToken} = require('../utils/auth');

const notLoggedIn = 'You need to be logged in to do that!';
const invalidLogin = 'Your username or password is incorrect.';

const resolvers = {
    Query: {
        allGames: async (parent, args) => { // May be replaced by a front end api call
            const searchParams = {...args};
            return Game.find({where: searchParams});
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
        login: async (parent, {username, password}) => {
            const user = await User.findOne({username});
            if (!user){
                throw new AuthenticationError(invalidLogin);
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw){
                throw new AuthenticationError(invalidLogin);
            }

            const token = signToken(user);
            return {token, user};
        },
        singleGameById: async (parent, {gameId}) => { // May be replaced by a front end api call
            return Game.find({gameId});
        }
    },
    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return {token, user};
        },
        addToLibrary: async (parent, args, context) =>{
            if (context.user){
                const game = await Game.create(args);
                return User.findOneAndUpdate(
                    {_id: context.user._id},
                    {$addToSet: {savedGames: game._id}},
                    {new: true, runValidators: true}
                );
            }
            throw new AuthenticationError(notLoggedIn);
        },
        removeFromLibrary: async (parent, {gameId}, context) =>{
            if (context.user){
                const game = await Game.findOne({gameId});
                return User.findOneAndUpdate(
                    {_id: context.user._id},
                    {$pull: {savedGames: {gameId: game._id}}},
                    {new: true}
                );
            }
            throw new AuthenticationError(notLoggedIn);
        },
        addToWishlist: async (parent, args, context) =>{
            if (context.user){
                const game = await Game.create(args);
                return User.findOneAndUpdate(
                    {_id: context.user._id},
                    {$addToSet: {wishList: game._id}},
                    {new: true, runValidators: true}
                );
            }
            throw new AuthenticationError(notLoggedIn);
        },
        removeFromWishlist: async (parent, {gameId}, context) =>{
            if (context.user){
                const game = await Game.findOne({gameId});
                return User.findOneAndUpdate(
                    {_id: context.user._id},
                    {$pull: {wishList: {gameId: game._id}}},
                    {new: true}
                );
            }
            throw new AuthenticationError(notLoggedIn);
        }
    }
};

module.exports = resolvers;