const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    picture: {
        type: Object
    }

}, { timestamps: true }
);

const BrandModal = new mongoose.model('Brand', brandSchema);
module.exports = BrandModal;
