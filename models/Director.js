import { model, Schema } from 'mongoose';

const DirectorSchema = new Schema({
    firstName: {
        type: String,
        required: true
    }
});

const DirectorModel = model('Director', DirectorSchema);
module.exports = DirectorModel;