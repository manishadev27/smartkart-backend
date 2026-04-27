const express = require('express');
const {
  getWishlist,
  toggleWishlist,
} = require('../controllers/wishlistController');
const { protectUser } = require('../middlewares/auth');

const router = express.Router();

router.use(protectUser);

router.route('/')
  .get(getWishlist);

router.route('/:productId')
  .post(toggleWishlist);

module.exports = router;
