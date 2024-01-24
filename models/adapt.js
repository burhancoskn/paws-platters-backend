import mongoose from 'mongoose';

const adaptSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    img: {
        type: String,
        required: true,
    },
    types: {
        type: String,
        required: true,
    },
    about: {
        type: String,
        required: true,
    },
    year: {
        type: String,
        required: true,
    },
    sex: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: true,
    },
    breed: {
        type: String,
        required: true,
    },
    coatLength: {
        type: String,
        required: true,
    },
    zip: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    adres: {
        type: String,
        required: true,
    },
    vaccinated: {
        type: Boolean,
        required: true,
    },
    fee: {
        type: Number,
        required: true,
    },
});

const AdaptModel = mongoose.model('Adapt', adaptSchema);

export default AdaptModel;
