const asyncHandler = require('../utils/asyncHandler');

// @desc    Upload image
// @route   POST /api/upload
// @access  Private
exports.uploadImage = asyncHandler(async (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'Please upload a file' });
  }

  // Generate dynamic public URL
  const filename = req.file.filename;
  // Use https if on production (Render), otherwise http
  const protocol = req.get('x-forwarded-proto') || req.protocol;
  const imageUrl = `${protocol}://${req.get('host')}/uploads/${filename}`;

  res.status(200).json({
    success: true,
    message: 'Image uploaded successfully',
    url: imageUrl,
  });
});
