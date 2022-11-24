const mongoose = require('mongoose');

const {Schema} = mongoose;

const gameSchema = new Schema({
    gameId: {
        type: Schema.Types.String,
        required: true
    },
    backgroundImage: {
        type: Schema.Types.String,
    },
    name: {
        type: Schema.Types.String,
        required: true
    },
    parentPlatforms: [{
        type: Schema.Types.String,
    }],
    metacriticUrl: {
        type: Schema.Types.String,
    },
    metacriticRating: {
        type: Schema.Types.Number,
    },
    released: {
        type: Schema.Types.String,
    },
    genres: [{
        type: Schema.Types.String,
    }],
    esrbRating: {
        type: Schema.Types.String,
    },
    screenshots: [{
        type: Schema.Types.String,
    }],
    redditUrl: {
        type: Schema.Types.String,
    },
    redditName: {
        type: Schema.Types.String,
    },
    description: {
        type: Schema.Types.String,
    },
    stores: [{
        type: Schema.Types.String,
    }],
});

const Game = mongoose.model('game', gameSchema);

module.exports = Game;