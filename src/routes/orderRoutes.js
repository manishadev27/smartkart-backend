const express = require('express');
const {
  placeOrder,
  getMyOrders,
  getOrderById,
  cancelOrder,
} = require('../controllers/orderController');
const { protectUser } = require('../middlewares/auth');

const router = express.Router();

router.use(protectUser);

router.route('/')
  .post(placeOrder);

router.route('/myorders')
  .get(getMyOrders);

router.route('/:id')
  .get(getOrderById);

router.route('/:id/cancel')
  .put(cancelOrder);

module.exports = router;
