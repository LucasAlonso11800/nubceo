const { model, Schema } = require('mongoose')

const TVShowSchema = new Schema({
    title: {
        type: String,
        required: true
    }
});

const TVShowModel = model('TVShow', TVShowSchema);
module.exports = TVShowModel;