const { body } = require('express-validator');

exports.productValidation = [
  body('name').notEmpty().withMessage('Product name is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('price').isNumeric().withMessage('Price must be a number'),
  body('category').notEmpty().withMessage('Category ID is required'),
  body('brand').notEmpty().withMessage('Brand is required'),
  body('stock').isNumeric().withMessage('Stock must be a number'),
];
