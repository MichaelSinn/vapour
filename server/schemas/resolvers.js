const {AuthenticationError, UserInputError} = require('apollo-server-express');
const {User, Game} = require('../models');
const {signToken} = require('../utils/auth');

const notLoggedIn = 'You need to be logged in to do that!';
const invalidLogin = 'Your username or password is incorrect.';
const gameNotFound = 'There is no such game with this ID';

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                return User.findById(context.user._id).populate(['savedGames', 'wishList']);
            }
            throw new AuthenticationError(notLoggedIn);
        },
        user: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({where: {username: args.username}}).populate(['savedGames', 'wishList']);
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
        }
    },
    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return {token, user};
        },
        addToLibrary: async (parent, {game}, context) =>{
            if (context.user){
                const gameData = await Game.create({...game});
                return User.findOneAndUpdate(
                    {_id: context.user._id},
                    {$addToSet: {savedGames: gameData._id}},
                    {new: true, runValidators: true}
                );
            }
            throw new AuthenticationError(notLoggedIn);
        },
        removeFromLibrary: async (parent, {gameId}, context) =>{
            if (context.user){
                const game = await Game.findOne({gameId}); // TODO: Also check that the game is inside of the current user's library
                if(!game){
                    throw new UserInputError(gameNotFound);
                }
                const user = User.findOneAndUpdate(
                    {_id: context.user._id},
                    {$pull: {savedGames: game._id}},
                    {new: true}
                ).populate('savedGames');
                await Game.deleteOne({_id: game._id}); // TODO: Look into cascading deletion for this
                return user;
            }
            throw new AuthenticationError(notLoggedIn);
        },
        addToWishlist: async (parent, {game}, context) =>{
            if (context.user){
                const gameData = await Game.create({...game});
                return User.findOneAndUpdate(
                    {_id: context.user._id},
                    {$addToSet: {wishList: gameData._id}},
                    {new: true, runValidators: true}
                );
            }
            throw new AuthenticationError(notLoggedIn);
        },
        removeFromWishlist: async (parent, {gameId}, context) =>{
            if (context.user){
                const game = await Game.findOne({gameId});
                if(!game){
                    throw new UserInputError(gameNotFound);
                }
                const user = User.findOneAndUpdate(
                    {_id: context.user._id},
                    {$pull: {wishList: {_id: game._id}}},
                    {new: true}
                ).populate('wishList');
                await Game.deleteOne({_id: game._id}); // TODO: Look into cascading deletion for this
                return user;
            }
            throw new AuthenticationError(notLoggedIn);
        }
    }
};

module.exports = resolvers;