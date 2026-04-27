const Product = require('../models/Product');
const Category = require('../models/Category');
const asyncHandler = require('../utils/asyncHandler');

// @desc    Get dashboard stats
// @route   GET /api/dashboard/stats
// @access  Private
exports.getStats = asyncHandler(async (req, res, next) => {
  const totalProducts = await Product.countDocuments();
  const totalCategories = await Category.countDocuments();
  
  const products = await Product.find();
  const totalStock = products.reduce((acc, item) => acc + item.stock, 0);
  
  const featuredProductsCount = await Product.countDocuments({ featured: true });
  
  const latestProducts = await Product.find()
    .sort('-createdAt')
    .limit(5)
    .populate('category', 'name');

  res.status(200).json({
    success: true,
    data: {
      totalProducts,
      totalCategories,
      totalStock,
      featuredProductsCount,
      latestProducts,
    },
  });
});
