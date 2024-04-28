const express = require('express');
const { AuthenticatorJWT, isAdmin } = require('../middlewares/authenticator');
const { getAllCategories, getAllSubCategories, getAllMainCategories, createMainCategory, createSubCategory, getCategoryById, updateCategory, deleteCategory, getAllSubCategoriesById, getAllSimpleCategories } = require('../controllers/categoryController');

const router = express.Router();

router.get('/get', getAllCategories);
router.get('/all-simple', getAllSimpleCategories);
router.get('/sub-categories', getAllSubCategories);
router.get('/all/sub/:id', getAllSubCategoriesById);
router.get('/main/get', getAllMainCategories);
router.post('/main/create', AuthenticatorJWT, isAdmin, createMainCategory);
router.post('/sub/create', AuthenticatorJWT, isAdmin, createSubCategory);
router.post('/edit/:id', getCategoryById);
router.put('/update/:id', AuthenticatorJWT, isAdmin, updateCategory);
router.delete('/delete/:id', AuthenticatorJWT, isAdmin, deleteCategory);


module.exports = router;