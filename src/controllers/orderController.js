const Order = require('../models/Order');
const Cart = require('../models/Cart');
const asyncHandler = require('../utils/asyncHandler');
const sendEmail = require('../utils/sendEmail');

// @desc    Place new order
// @route   POST /api/orders
// @access  Private
exports.placeOrder = asyncHandler(async (req, res, next) => {
  const { orderItems, shippingAddress, paymentMethod, totalPrice } = req.body;

  if (!orderItems || orderItems.length === 0) {
    return res.status(400).json({ success: false, message: 'No order items' });
  }

  const order = await Order.create({
    user: req.user.id,
    orderItems,
    shippingAddress,
    paymentMethod,
    totalPrice,
    isPaid: paymentMethod === 'Online', // Placeholder logic for now
    paidAt: paymentMethod === 'Online' ? Date.now() : undefined,
  });

  // Clear user cart
  await Cart.findOneAndDelete({ user: req.user.id });

  // Send Confirmation Email
  try {
    await sendEmail({
      email: req.user.email,
      subject: `Order Confirmed - #${order._id}`,
      message: `Thank you for your order. Your order total is ₹${totalPrice}.`,
      html: `<h1>Order Confirmation</h1><p>Order ID: ${order._id}</p><p>Total: ₹${totalPrice}</p>`,
    });
  } catch (err) {
    console.log('Order email could not be sent');
  }

  res.status(201).json({
    success: true,
    message: 'Order placed successfully',
    data: order,
  });
});

// @desc    Get user orders
// @route   GET /api/orders/myorders
// @access  Private
exports.getMyOrders = asyncHandler(async (req, res, next) => {
  const orders = await Order.find({ user: req.user.id }).sort('-createdAt');

  res.status(200).json({
    success: true,
    data: orders,
  });
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
exports.getOrderById = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate('user', 'name email');

  if (!order) {
    return res.status(404).json({ success: false, message: 'Order not found' });
  }

  // Check if order belongs to user
  if (order.user._id.toString() !== req.user.id) {
    return res.status(403).json({ success: false, message: 'Not authorized to view this order' });
  }

  res.status(200).json({
    success: true,
    data: order,
  });
});

// @desc    Cancel order
// @route   PUT /api/orders/:id/cancel
// @access  Private
exports.cancelOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return res.status(404).json({ success: false, message: 'Order not found' });
  }

  if (order.user.toString() !== req.user.id) {
    return res.status(403).json({ success: false, message: 'Not authorized' });
  }

  if (order.orderStatus !== 'Pending' && order.orderStatus !== 'Processing') {
    return res.status(400).json({ success: false, message: 'Order cannot be cancelled now' });
  }

  order.orderStatus = 'Cancelled';
  await order.save();

  res.status(200).json({
    success: true,
    message: 'Order cancelled',
    data: order,
  });
});
