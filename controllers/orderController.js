const User = require('../models/userModel');
const Order = require('../models/orderModel');
const Product = require('../models/productModel');
const Template = require('../email-template');
const sendEmail = require('../nodemailer');
const config = require('../config/keys');
const stripe = require('stripe')(config.STRIPE_SECRET);

exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 });
        if (orders) {
            res.status(200).json(orders);
        } else {
            res.status(404).json({ errorMessage: 'No orders Found' });
        }
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
}

exports.getAllCompletedOrders = async (req, res) => {
    try {
        const orders = await Order.find({ status: '5' }).sort({ createdAt: -1 });
        if (orders) {
            res.status(200).json(orders);
        } else {
            res.status(404).json({ errorMessage: 'No orders Found' });
        }
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
}


exports.getAllCustomerOrdersById = async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.params.id }).sort({ createdAt: -1 });
        if (orders) {
            res.status(200).json(orders);
        } else {
            res.status(404).json({ errorMessage: 'No orders Found' });
        }
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
}

exports.getAllOrderById = async (req, res) => {
    try {
        const orders = await Order.findOne({ _id: req.params.id });
        if (orders) {
            res.status(200).json(orders);
        } else {
            res.status(404).json({ errorMessage: 'No orders Found' });
        }
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
}

exports.createStripePaymentIntent = async (req, res) => {
    const { totalPrice } = req.body;
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: parseInt(totalPrice) * 100,
            currency: "EUR",
            automatic_payment_methods: {
                enabled: true,
            },
        })

        res.status(200).json({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (err) {
        console.log(err);
        res.status(400).json({ err, errorMessage: "Error while creating stripe payment intent" })
    }
}

exports.paymentController = async (req, res) => {
    try {
        const { token } = req.body;
        stripe.charges.create({
            description: 'Buying My Shop Product',
            source: token.id,
            currency: 'USD',
            amount: parseInt(10 * 100),
            receipt_email: token.email
        })
            .then(result => {
                User.findOne({ _id: req.user._id }).exec((error, user) => {
                    if (error) {
                        res.status.json({ errorMessage: 'User not found' });
                    }
                    if (user) {
                        user.save();
                        res.status(200).json({ successMessage: 'Paid Successfully!', result });
                    }
                })
            }).catch(err => {
                console.log(err);
                res.status(400).json({ errorMessage: 'Payment failed. Try again!', err });
            });
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
}


exports.placeOrderStripe = async (req, res) => {
    try {
        const { cartProducts, user, paymentData, placed, address, totalPrice } = req.body;
        const order = new Order({
            userId: req.user._id,
            user,
            products: cartProducts,
            user: {
                name: user?.firstName + user?.lastName,
                email: user?.email
            },
            paymentData,
            placed,
            address,
            totalPrice,
        });
        await order.save(async (err, result) => {
            if (err) { console.log('Payment Failed', err) }
            if (result) {
                sendEmail(user?.email, "Your order is placed!", Template({ orderId: result._id, name: user?.firstName + " " + user?.lastName }))
                res.status(200).json({ successMessage: 'Successfully Purchased Items!' });
                // const findProduct = await Product.findOne({ _id: item.productId });
                // if (findProduct) {
                //     findProduct.qty = findProduct.qty - item.qty;
                //     findProduct.save((error, data) => {
                //         if (error) {
                //             console.log(error)
                //         } else {
                //             sendEmail(email, "Your order is placed!", Template({ orderId: result._id, name: req.body.name }))
                //         }
                //     })
                // }
            } else {
                console.log('error');
            }
        })
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
}


exports.setOrderStatus = async (req, res) => {
    try {
        let getStatus = req.body.status == '2' ?
            `Confirmed`
            :
            req.body.status == '3' ?
                `Prepared`
                :
                req.body.status == '4' ?
                    `Out for delivery`
                    :
                    req.body.status == '5' ?
                        `Complete`
                        :
                        null;
        const order = await Order.findOne({ _id: req.body.orderId });
        if (order) {
            order.status = req.body.status
            order.statusUpdateTime = req.body.updateTime
            order.save(async (error, result) => {
                console.log(error);
                if (error) {
                    res.status(400).json({ errorMessage: 'Status update failed!' });
                }
                if (result) {
                    await sendEmail(result.user.email, "You've got order updates!", Template({ orderId: result._id, name: result.user.name, orderStatus: getStatus }))
                    res.status(200).json({ successMessage: 'Order status updated successfully!' });
                }
            })
        } else {
            res.status(404).json({ errorMessage: 'No order found!' });
        }
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
}

exports.cancelOrder = async (req, res) => {
    try {
        const order = await Order.findOne({ _id: req.params.id }).exec();
        if (order) {
            order.status = "0";
            order.save(async (err, result) => {
                if (result) {
                    await sendEmail(result.user.email, "Your is cancelled", Template({ orderId: result._id, name: result.user.name, orderStatus: "Cancelled" }))
                    res.status(200).json({ successMessage: 'Order Cancelled Successfully' });
                } else {
                    console.log('Failed order cancellation');
                }
            })
        } else {
            res.status(404).json({ errorMessage: 'No order found!' });
        }
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
}


