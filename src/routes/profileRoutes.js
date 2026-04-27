const express = require('express');
const {
  getProfile,
  updateProfile,
  addAddress,
  updateAddress,
  deleteAddress,
} = require('../controllers/profileController');
const { protectUser } = require('../middlewares/auth');

const router = express.Router();

router.use(protectUser); // All profile routes are protected

router.route('/')
  .get(getProfile)
  .put(updateProfile);

router.route('/address')
  .post(addAddress);

router.route('/address/:addressId')
  .put(updateAddress)
  .delete(deleteAddress);

module.exports = router;
