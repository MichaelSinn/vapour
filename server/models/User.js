const mongoose = require('mongoose');

const {Schema} = mongoose;
const Game = require('./Game');

const userSchema = new Schema({
    username: {
        type: Schema.Types.String,
        required: true,
        unique: true
    },
    email: {
        type: Schema.Types.String,
        required: true,
        unique: true
    },
    password: {
        type: Schema.Types.String,
        required: true
    },
    savedGames: [
        {
            type: Schema.Types.ObjectId,
            ref: Game
        }
    ],
    wishList: [
        {
            type: Schema.Types.ObjectId,
            ref: Game
        }
    ],
    cart: [
        {
            type: Schema.Types.ObjectId,
            ref: Game
        }
    ]
});

const User = mongoose.model('user', userSchema);

module.exports(User);