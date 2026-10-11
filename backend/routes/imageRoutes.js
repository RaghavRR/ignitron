const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { protect } = require('../middleware/auth');
const { getAllImages, getImageByKey, createImage, updateImage, deleteImage } = require('../controllers/imageController');
const optimizeImages = require('../middleware/optimizeImages');

router.get('/', getAllImages);
router.get('/:key', getImageByKey);
router.post(
  '/',
  protect,
  upload.single('image'),
  optimizeImages,
  createImage
);

router.put(
  '/:key',
  protect,
  upload.single('image'),
  optimizeImages,
  updateImage
);
router.delete('/:key', protect, deleteImage);

module.exports = router;
