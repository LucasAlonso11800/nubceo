import { model, Schema } from 'mongoose';

const ActorSchema = new Schema({
    firstName: {
        type: String,
        required: true
    }
});

const ActorModel = model('Actor', ActorSchema);
module.exports = ActorModel;