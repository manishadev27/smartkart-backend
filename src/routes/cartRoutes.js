const express = require('express');
const {
  getCart,
  addToCart,
  removeFromCart,
} = require('../controllers/cartController');
const { protectUser } = require('../middlewares/auth');

const router = express.Router();

router.use(protectUser);

router.route('/')
  .get(getCart)
  .post(addToCart);

router.route('/:productId')
  .delete(removeFromCart);

module.exports = router;
