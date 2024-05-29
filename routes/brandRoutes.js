const express = require('express');
const { getAllBrands, createBrand, getBrandById, updateBrand, deleteBrand } = require('../controllers/brandController');
const { AuthenticatorJWT, isAdmin } = require('../middlewares/authenticator');

const router = express.Router();

router.get('/get', getAllBrands);
router.post('/create', AuthenticatorJWT, isAdmin, createBrand);
router.get('/edit/:id', getBrandById);
router.put('/update/:id', AuthenticatorJWT, isAdmin, updateBrand);
router.delete('/delete/:id', AuthenticatorJWT, isAdmin, deleteBrand);


module.exports = router;