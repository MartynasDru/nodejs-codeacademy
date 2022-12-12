const mongoose = require('mongoose');

const advertSchema = new mongoose.Schema({
    brand: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});
const advertModel = mongoose.model('advert', advertSchema);

module.exports = advertModel;