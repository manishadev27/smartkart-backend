const User = require('../models/User');
const asyncHandler = require('../utils/asyncHandler');

// @desc    Get current user profile
// @route   GET /api/profile
// @access  Private
exports.getProfile = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    data: user,
  });
});

// @desc    Update user profile
// @route   PUT /api/profile
// @access  Private
exports.updateProfile = asyncHandler(async (req, res, next) => {
  const fieldsToUpdate = {
    name: req.body.name,
    email: req.body.email,
  };

  const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: user,
  });
});

// @desc    Add Address
// @route   POST /api/profile/address
// @access  Private
exports.addAddress = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  user.addresses.push(req.body);

  // If this is the first address, make it default
  if (user.addresses.length === 1) {
    user.addresses[0].isDefault = true;
  }

  await user.save();

  res.status(200).json({
    success: true,
    data: user.addresses,
  });
});

// @desc    Update Address
// @route   PUT /api/profile/address/:addressId
// @access  Private
exports.updateAddress = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  const address = user.addresses.id(req.params.addressId);
  if (!address) {
    return res.status(404).json({ success: false, message: 'Address not found' });
  }

  address.set(req.body);
  await user.save();

  res.status(200).json({
    success: true,
    data: user.addresses,
  });
});

// @desc    Delete Address
// @route   DELETE /api/profile/address/:addressId
// @access  Private
exports.deleteAddress = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  user.addresses.pull(req.params.addressId);
  await user.save();

  res.status(200).json({
    success: true,
    data: user.addresses,
  });
});
