const express = require('express');
const { uploadImage } = require('../controllers/uploadController');
const { protect } = require('../middlewares/auth');
const { upload } = require('../config/cloudinary');

const router = express.Router();

router.post('/', protect, upload.single('image'), uploadImage);

module.exports = router;
