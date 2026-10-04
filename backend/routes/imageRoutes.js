const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { protect } = require('../middleware/auth');
const { getAllImages, getImageByKey, createImage, updateImage, deleteImage } = require('../controllers/imageController');

router.get('/', getAllImages);
router.get('/:key', getImageByKey);
router.post('/', protect, upload.single('image'), createImage);
router.put('/:key', protect, upload.single('image'), updateImage);
router.delete('/:key', protect, deleteImage);

module.exports = router;
