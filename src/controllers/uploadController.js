const asyncHandler = require('../utils/asyncHandler');
const { isCloudinaryConfigured } = require('../config/cloudinary');

// @desc    Upload image
// @route   POST /api/upload
// @access  Private
exports.uploadImage = asyncHandler(async (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'Please upload a file' });
  }

  let imageUrl = req.file.path;
  
  // If local storage was used, format the URL
  if (!isCloudinaryConfigured) {
    const filename = req.file.filename;
    imageUrl = `${req.protocol}://${req.get('host')}/uploads/${filename}`;
  }

  res.status(200).json({
    success: true,
    message: 'Image uploaded successfully',
    url: imageUrl,
  });
});
