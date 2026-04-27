const express = require('express');
const { login, getMe } = require('../controllers/authController');
const { protect } = require('../middlewares/auth');
const { loginValidation } = require('../validations/authValidation');

const router = express.Router();

router.post('/login', loginValidation, login);
router.get('/me', protect, getMe);

module.exports = router;
