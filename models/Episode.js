import { model, Schema } from 'mongoose';

const EpisodeSchema = new Schema({
    title: {
        type: String,
        required: true
    }
});

const EpisodeModel = model('Episode', EpisodeSchema);
module.exports = EpisodeModel;