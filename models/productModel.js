const mongoose = require('mongoose');

const productShema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    subTitle: {
        type: String,
    },
    originalPrice: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    gender: {
        type: String
    },
    description: {
        type: String,
        required: true
    },
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    mainCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
    },
    subCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: false
    },
    brand: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Brand',
    },
    qty: {
        type: Number,
        default: 0
    },
    featured: {
        type: String,
        default: "no"
    },
    shippingDetails: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        default: "Active"
    },
    pictures: {
        type: Array
    }
}, { timestamps: true });

const productModel = new mongoose.model('Product', productShema);
module.exports = productModel;