const { model, Schema } = require('mongoose')

const MovieSchema = new Schema({
    title: {
        type: Schema.Types.String,
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

const MovieModel = model('Movie', MovieSchema);
module.exports = MovieModel;