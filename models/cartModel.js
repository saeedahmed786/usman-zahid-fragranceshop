const mongoonse = require('mongoose');

const cartSchema = new mongoonse.Schema({
    userId: {
        type: mongoonse.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    products:
    {
        type: Array,
        default: []
    }
}, { timestamps: true }
);

const cartModel = new mongoonse.model('cart', cartSchema);

module.exports = cartModel;