const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    role: {
        type: Number,
        default: 0
    },
    picture: {
        type: Object,
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    gender: {
        type: String,
    },
    birthday: {
        type: String
    },
    username: {
        type: String,
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    resetToken: {
        type: String
    },
    expireToken: {
        type: String
    },
    verification: {
        type: Boolean,
        default: false
    },
    address: {
        type: String,
    },
    address2: {
        type: String,
    },
    postalCode: {
        type: String,
    },
    city: {
        type: String,
    },
    country: {
        type: String,
    },
    phone: {
        type: String,
    },
    accountType: {
        type: String,
    },
    timezone: {
        type: String,
    },
    nationality: {
        type: String,
    },
    quote: {
        type: String,
    },
    interest: {
        type: String,
    },
    orders: {
        type: Array
    },
    acceptsCommission: {
        type: Array
    },
    lastMessage: {
        type: Object
    },
    status: {
        type: String,
        default: 'active'
    },

}, { timestamps: true }
);

const userModel = new mongoose.model('User', userSchema);
module.exports = userModel;
