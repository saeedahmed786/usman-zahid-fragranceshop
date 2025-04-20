const express = require('express');
const upload = require('../middlewares/multer');
const { isAdmin, AuthenticatorJWT } = require('../middlewares/authenticator');
const { getProductById, updateProduct, deleteProduct, getRelatedProducts, uploadProduct, getAllAdminProducts, getLimitedProducts, getProductByOneParameter, getProductByMultipleFilters, getFeaturedProducts, getSellerLimitedProducts, getFilteredProductsCount, getSellerProductByOneParameter } = require('../controllers/productController');

const router = express.Router();

router.get('/get/:page', getLimitedProducts);
router.get('/seller/:id', getSellerLimitedProducts);
router.get('/get/related/:id', getRelatedProducts);
router.get('/get/featured', getFeaturedProducts);
router.get('/admin/get/:id', getAllAdminProducts);
router.get('/product/:id', getProductById);
router.post('/filter', getProductByOneParameter);
router.post('/seller/filter', AuthenticatorJWT, getSellerProductByOneParameter);
router.post('/multi-filter', getProductByMultipleFilters);
router.post('/filter/count/:id', getFilteredProductsCount);
router.post('/create', AuthenticatorJWT, uploadProduct);
router.put('/update/:id', AuthenticatorJWT, updateProduct);
router.get('/get/related/:id', getRelatedProducts);
router.delete('/delete/:id', AuthenticatorJWT, isAdmin, deleteProduct);

module.exports = router;