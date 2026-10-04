const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { protect } = require('../middleware/auth');
const {
  getResources,
  getResourcesAdmin,
  getResourceBySlug,
  createResource,
  updateResource,
  deleteResource,
} = require('../controllers/resourceController');

const cpUpload = upload.fields([{ name: 'coverImage', maxCount: 1 }, { name: 'file', maxCount: 1 }]);

router.get('/', getResources);
router.get('/admin/all', protect, getResourcesAdmin);
router.get('/:slug', getResourceBySlug);
router.post('/', protect, cpUpload, createResource);
router.put('/:id', protect, cpUpload, updateResource);
router.delete('/:id', protect, deleteResource);

module.exports = router;
