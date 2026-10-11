const express = require('express');

const router = express.Router();
const upload = require('../middleware/upload');
const optimizeImages = require('../middleware/optimizeImages');

const {
  getPublicKits,
  getAdminKits,
  getKitById,
  getKitBySlug,
  createKit,
  updateKit,
  deleteKit,
} = require('../controllers/kitController');

const { protect } = require('../middleware/auth');

// ==========================================
// PUBLIC ROUTES
// ==========================================

// Get all active kits
router.get('/', getPublicKits);

// Get single active kit by slug
router.get('/slug/:slug', getKitBySlug);

// ==========================================
// PROTECTED ADMIN ROUTES
// ==========================================

// Get all kits including inactive
router.get('/admin', protect, getAdminKits);

// Get single kit
router.get('/:id', protect, getKitById);

router.post(
  '/',
  protect,
  upload.array('imageFiles', 5),
  optimizeImages,
  createKit
);

router.put(
  '/:id',
  protect,
  upload.array('imageFiles', 5),
  optimizeImages,
  updateKit
);

// Delete
router.delete('/:id', protect, deleteKit);

module.exports = router;