const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    picture: {
        type: Object
    },
    parentId: {
        type: String
    }

}, { timestamps: true }
);

const CategoryModal = new mongoose.model('Category', categorySchema);
module.exports = CategoryModal;
