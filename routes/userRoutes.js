const express = require('express');
const upload = require('../middlewares/multer');
const { AuthenticatorJWT, isAdmin } = require('../middlewares/authenticator');
const { getAllUsers, getUserById, adminLogin, changePassword, resetPasswordLink, updatePassword, SignUp, Login, updateEmail, addUserByAdmin, updateUserByAdmin, deleteUser, updateUser } = require('../controllers/userController');

const router = express.Router();

router.get('/', AuthenticatorJWT, isAdmin, getAllUsers);
router.get('/get/:id', getUserById);
router.post('/signup', SignUp);
router.post('/admin/add-user', addUserByAdmin);
router.post('/login', Login);
router.post('/admin/login', adminLogin);
router.put('/admin/update/:id', AuthenticatorJWT, updateUserByAdmin);
router.put('/update/:id', AuthenticatorJWT, updateUser);
router.put('/update/email', AuthenticatorJWT, updateEmail);
router.put('/change-password', AuthenticatorJWT, changePassword);

router.post('/send/forgot-email', resetPasswordLink);
router.put('/reset-password', updatePassword);

router.delete('/delete/:id', AuthenticatorJWT, isAdmin, deleteUser);

module.exports = router; 