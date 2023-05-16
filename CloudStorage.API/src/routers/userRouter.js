const express = require('express');
const {
  uploadImageToS3,
  deleteImageFromS3,
  getImageFromS3,
} = require('../middleware/s3-handlers');
const userAuth = require('../middleware/auth');
const {
  register,
  login,
  logout,
  uploadAndAddImageToUser,
  getAllUserImages,
  getUserImage,
  deleteImageFromUser,
} = require('../controlers/userControler');

const router = new express.Router();

router.post('/users/signon', register);

router.post('/users/login', login);

router.post('/users/logout', userAuth, logout);

// -------------------------------------------------------------------------------

router.post(
  '/upload-image',
  userAuth,
  uploadImageToS3,
  uploadAndAddImageToUser
);

router.get('/get-images', userAuth, getAllUserImages);

router.get('/get-image', getImageFromS3, getUserImage);

router.delete(
  '/delete-image',
  userAuth,
  deleteImageFromS3,
  deleteImageFromUser
);

module.exports = router;
