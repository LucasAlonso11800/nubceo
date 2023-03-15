const { model, Schema, Types } = require('mongoose')

const EpisodeSchema = new Schema({
    title: {
        type: Schema.Types.String,
        required: true
    },
    tvShowId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    season: {
        type: Schema.Types.Number,
        required: true
    },
    length: {
        type: Schema.Types.String,
        required: true
    },
    date: {
        type: Schema.Types.Date,
        required: true
    },
    directorId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Director"
    }
});


const EpisodeModel = model('Episode', EpisodeSchema);
module.exports = EpisodeModel;