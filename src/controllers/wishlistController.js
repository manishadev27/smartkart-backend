const Wishlist = require('../models/Wishlist');
const asyncHandler = require('../utils/asyncHandler');

// @desc    Get user wishlist
// @route   GET /api/wishlist
// @access  Private
exports.getWishlist = asyncHandler(async (req, res, next) => {
  let wishlist = await Wishlist.findOne({ user: req.user.id }).populate('products');

  if (!wishlist) {
    wishlist = await Wishlist.create({ user: req.user.id, products: [] });
  }

  res.status(200).json({
    success: true,
    data: wishlist,
  });
});

// @desc    Add/Remove from wishlist (Toggle)
// @route   POST /api/wishlist/:productId
// @access  Private
exports.toggleWishlist = asyncHandler(async (req, res, next) => {
  const productId = req.params.productId;
  let wishlist = await Wishlist.findOne({ user: req.user.id });

  if (!wishlist) {
    wishlist = await Wishlist.create({ user: req.user.id, products: [productId] });
  } else {
    const isAdded = wishlist.products.includes(productId);

    if (isAdded) {
      wishlist.products = wishlist.products.filter((id) => id.toString() !== productId);
    } else {
      wishlist.products.push(productId);
    }
    await wishlist.save();
  }

  res.status(200).json({
    success: true,
    message: 'Wishlist updated',
    data: wishlist,
  });
});
