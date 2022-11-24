const mongoose = require('mongoose');

const {Schema} = mongoose;

const gameSchema = new Schema({
    gameId: {
        type: Schema.Types.String,
        required: true
    },
    name: {
        type: Schema.Types.String,
        required: true
    },
    rating: {
        type: Schema.Types.Number,
        default: 0
    },
    image: {
        type: Schema.Types.String
    },
    genres: [
        {
            type: Schema.Types.String
        }
    ],
    storeLink: {
        type: Schema.Types.String
    },
    description: {
        type: Schema.Types.String
    }
});

const Game = mongoose.model('game', gameSchema);

module.exports = Game;