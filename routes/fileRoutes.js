const express = require('express');
const { uploadFiles, deleteFile } = require('../controllers/uploadFilesController');
const { AuthenticatorJWT } = require('../middlewares/authenticator');
const upload = require('../middlewares/multer');

const router = express.Router();

router.post('/upload', upload.single("file"), uploadFiles);
router.post('/delete', deleteFile);


module.exports = router;