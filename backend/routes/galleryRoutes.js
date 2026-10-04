const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
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
router.post('/', protect, upload.single('media'), createGalleryItem);
router.put('/:id', protect, upload.single('media'), updateGalleryItem);
router.delete('/:id', protect, deleteGalleryItem);

module.exports = router;
