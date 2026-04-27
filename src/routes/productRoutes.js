const express = require('express');
const {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');
const { protect } = require('../middlewares/auth');
const { productValidation } = require('../validations/productValidation');

const router = express.Router();

router.route('/')
  .get(getProducts)
  .post(protect, productValidation, createProduct);

router.route('/:id')
  .get(getProduct)
  .put(protect, updateProduct)
  .delete(protect, deleteProduct);

module.exports = router;
