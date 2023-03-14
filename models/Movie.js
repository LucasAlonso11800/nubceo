import { model, Schema } from 'mongoose';

const MovieSchema = new Schema({
    title: {
        type: String,
        required: true
    }
});

const MovieModel = model('Movie', MovieSchema);
module.exports = MovieModel;