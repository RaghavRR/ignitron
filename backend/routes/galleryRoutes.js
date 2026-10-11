const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const optimizeImages = require('../middleware/optimizeImages');
const { protect } = require('../middleware/auth');
const {
  getGallery,
  getGalleryAdmin,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
} = require('../controllers/galleryController');

router.get('/', getGallery);
router.get('/admin/all', protect, getGalleryAdmin);
router.post(
  '/',
  protect,
  upload.single('media'),
  optimizeImages,
  createGalleryItem
);

router.put(
  '/:id',
  protect,
  upload.single('media'),
  optimizeImages,
  updateGalleryItem
);
router.delete('/:id', protect, deleteGalleryItem);

module.exports = router;
