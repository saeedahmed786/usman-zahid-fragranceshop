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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    }

}, { timestamps: true }
);

const CategoryModal = new mongoose.model('Category', categorySchema);
module.exports = CategoryModal;
