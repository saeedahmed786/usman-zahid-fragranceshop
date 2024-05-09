const express = require('express');
const { isAdmin, AuthenticatorJWT } = require('../middlewares/authenticator');
const { cancelOrder, getAllOrders, setOrderStatus, getAllOrderById, getAllCustomerOrdersById, getAllCompletedOrders, placeOrderStripe, createStripePaymentIntent } = require('../controllers/orderController');

const router = express.Router();

router.get('/get/order/:id', AuthenticatorJWT, getAllOrderById);
router.get('/completed-orders', AuthenticatorJWT, getAllCompletedOrders);
router.get('/admin/all-orders', AuthenticatorJWT, isAdmin, getAllOrders);
router.get('/customer/orders/:id', AuthenticatorJWT, getAllCustomerOrdersById);
router.post('/create-payment-intent', AuthenticatorJWT, createStripePaymentIntent);
router.post('/place-order', AuthenticatorJWT, placeOrderStripe);
router.put('/set/status', AuthenticatorJWT, isAdmin, setOrderStatus);
router.delete('/order/cancel/:id', AuthenticatorJWT, cancelOrder);


module.exports = router;