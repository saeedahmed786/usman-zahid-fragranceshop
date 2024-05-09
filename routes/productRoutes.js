const express = require('express');
const { isAdmin, AuthenticatorJWT } = require('../middlewares/authenticator');
const { getProductById, updateProduct, deleteProduct, getRelatedProducts, uploadProduct, getAllAdminProducts, getLimitedProducts, getProductByOneParameter, getFeaturedProducts, getSellerLimitedProducts, getFilteredProductsCount, getSellerProductByOneParameter, searchProducts } = require('../controllers/productController');

const router = express.Router();

router.get('/get/:page', getLimitedProducts);
router.get('/seller/:id', getSellerLimitedProducts);
router.get('/get/related/:id', getRelatedProducts);
router.get('/get/featured', getFeaturedProducts);
router.get('/admin/get/:id', getAllAdminProducts);
router.get('/product/:id', getProductById);
router.post('/search', searchProducts);
router.post('/filter', getProductByOneParameter);
router.post('/seller/filter', AuthenticatorJWT, getSellerProductByOneParameter);
router.post('/filter/count/:id', getFilteredProductsCount);
router.post('/create', AuthenticatorJWT, uploadProduct);
router.put('/update/:id', AuthenticatorJWT, updateProduct);
router.get('/get/related/:id', getRelatedProducts);
router.delete('/delete/:id', AuthenticatorJWT, isAdmin, deleteProduct);

module.exports = router;