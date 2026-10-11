const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { protect } = require('../middleware/auth');
const optimizeImages = require('../middleware/optimizeImages');
const {
  getTestimonials,
  getTestimonialsAdmin,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} = require('../controllers/testimonialController');

router.get('/', getTestimonials);
router.get('/admin/all', protect, getTestimonialsAdmin);
router.post(
  '/',
  protect,
  upload.single('photo'),
  optimizeImages,
  createTestimonial
);

router.put(
  '/:id',
  protect,
  upload.single('photo'),
  optimizeImages,
  updateTestimonial
);
router.delete('/:id', protect, deleteTestimonial);

module.exports = router;
