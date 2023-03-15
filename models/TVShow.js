const { model, Schema } = require('mongoose')

const TVShowSchema = new Schema({
    title: {
        type: Schema.Types.String,
        required: true
    },
    seasons: {
        type: Schema.Types.Number,
        required: true
    },
    actors: [{
        type: Schema.Types.ObjectId,
        ref: "Actor",
        unique: true
    }],
    director: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Director"
    },
    genre: {
        type: Schema.Types.String,
        required: true,
    },
    year: {
        type: Schema.Types.String,
        required: true,
    }
});

const TVShowModel = model('TVShow', TVShowSchema);
module.exports = TVShowModel;