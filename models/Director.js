const { model, Schema } = require('mongoose')

const DirectorSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    birthDate: {
        type: Date,
        required: true
    }
});

const DirectorModel = model('Director', DirectorSchema);
module.exports = DirectorModel;