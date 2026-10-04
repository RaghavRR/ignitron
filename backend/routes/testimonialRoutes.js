const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { protect } = require('../middleware/auth');
const {
  getTestimonials,
  getTestimonialsAdmin,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} = require('../controllers/testimonialController');

router.get('/', getTestimonials);
router.get('/admin/all', protect, getTestimonialsAdmin);
router.post('/', protect, upload.single('photo'), createTestimonial);
router.put('/:id', protect, upload.single('photo'), updateTestimonial);
router.delete('/:id', protect, deleteTestimonial);

module.exports = router;
