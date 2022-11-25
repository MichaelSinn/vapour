const {AuthenticationError} = require('apollo-server-express');
const {User} = require('../models');
const {signToken} = require('../utils/auth');

const notLoggedIn = 'You need to be logged in to do that!';
const invalidLogin = 'Your username or password is incorrect.';

const resolvers = {
    Query: {
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
            if (!user) {
                throw new AuthenticationError(invalidLogin);
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError(invalidLogin);
            }

            const token = signToken(user);
            return {token, user};
        }
    },
    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return {token, user};
        },
        addToLibrary: async (parent, {game}, context) => {
            if (context.user) {
                const duplicateCheck = await User.findOne({_id: context.user._id, 'savedGames.gameId': {$eq: game.gameId}});
                if (duplicateCheck){
                    return duplicateCheck;
                }

                return User.findOneAndUpdate(
                    {_id: context.user._id},
                    {$addToSet: {savedGames: {...game}}},
                    {new: true, runValidators: true}
                );
            }
            throw new AuthenticationError(notLoggedIn);
        },
        removeFromLibrary: async (parent, {gameId}, context) => {
            if (context.user) {
                return User.findOneAndUpdate(
                    {_id: context.user._id},
                    {$pull: {savedGames: {gameId}}},
                    {new: true}
                );
            }
            throw new AuthenticationError(notLoggedIn);
        },
        addToWishlist: async (parent, {game}, context) => {
            if (context.user) {
                const duplicateCheck = await User.findOne({_id: context.user._id, 'wishList.gameId': {$eq: game.gameId}});
                if (duplicateCheck){
                    return duplicateCheck;
                }

                return User.findOneAndUpdate(
                    {_id: context.user._id},
                    {$addToSet: {wishList: {...game}}},
                    {new: true, runValidators: true}
                );
            }
            throw new AuthenticationError(notLoggedIn);
        },
        removeFromWishlist: async (parent, {gameId}, context) => {
            if (context.user) {
                return User.findOneAndUpdate(
                    {_id: context.user._id},
                    {$pull: {wishList: {gameId}}},
                    {new: true}
                );
            }
            throw new AuthenticationError(notLoggedIn);
        }
    }
};

module.exports = resolvers;