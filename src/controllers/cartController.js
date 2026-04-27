const Cart = require('../models/Cart');
const Product = require('../models/Product');
const asyncHandler = require('../utils/asyncHandler');

// @desc    Get user cart
// @route   GET /api/cart
// @access  Private
exports.getCart = asyncHandler(async (req, res, next) => {
  let cart = await Cart.findOne({ user: req.user.id }).populate('items.product');

  if (!cart) {
    cart = await Cart.create({ user: req.user.id, items: [], totalPrice: 0 });
  }

  res.status(200).json({
    success: true,
    data: cart,
  });
});

// @desc    Add to cart
// @route   POST /api/cart
// @access  Private
exports.addToCart = asyncHandler(async (req, res, next) => {
  const { productId, quantity } = req.body;

  const product = await Product.findById(productId);
  if (!product) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }

  let cart = await Cart.findOne({ user: req.user.id });

  if (!cart) {
    cart = await Cart.create({
      user: req.user.id,
      items: [{ product: productId, quantity, price: product.price }],
    });
  } else {
    const itemIndex = cart.items.findIndex((item) => item.product.toString() === productId);

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity, price: product.price });
    }
  }

  // Calculate total price
  cart.totalPrice = cart.items.reduce((total, item) => total + item.quantity * item.price, 0);
  cart.updatedAt = Date.now();
  await cart.save();

  res.status(200).json({
    success: true,
    data: cart,
  });
});

// @desc    Remove from cart
// @route   DELETE /api/cart/:productId
// @access  Private
exports.removeFromCart = asyncHandler(async (req, res, next) => {
  let cart = await Cart.findOne({ user: req.user.id });

  if (!cart) {
    return res.status(404).json({ success: false, message: 'Cart not found' });
  }

  cart.items = cart.items.filter((item) => item.product.toString() !== req.params.productId);

  // Calculate total price
  cart.totalPrice = cart.items.reduce((total, item) => total + item.quantity * item.price, 0);
  await cart.save();

  res.status(200).json({
    success: true,
    data: cart,
  });
});
