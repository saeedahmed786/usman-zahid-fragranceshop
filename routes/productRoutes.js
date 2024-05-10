const express = require('express');
const { isAdmin, AuthenticatorJWT } = require('../middlewares/authenticator');
const { getProductById, updateProduct, deleteProduct, getRelatedProducts, uploadProduct, getAllAdminProducts, getLimitedProducts, getProductByOneParameter, getFeaturedProducts, getSellerLimitedProducts, getFilteredProductsCount, getSellerProductByOneParameter, searchProducts, filterProducts } = require('../controllers/productController');

const router = express.Router();

router.get('/get/related/:id', getRelatedProducts);
router.get('/get/featured', getFeaturedProducts);
router.get('/admin/get/:id', getAllAdminProducts);
router.get('/product/:id', getProductById);
router.post('/get/:page', getLimitedProducts);
router.post('/search', searchProducts);
router.post('/filter', filterProducts);
router.post('/create', AuthenticatorJWT, uploadProduct);
router.put('/update/:id', AuthenticatorJWT, updateProduct);
router.get('/get/related/:id', getRelatedProducts);
router.delete('/delete/:id', AuthenticatorJWT, isAdmin, deleteProduct);

module.exports = router;