const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { getImpact, createImpact, updateImpact, deleteImpact } = require('../controllers/impactController');

router.get('/', getImpact);
router.post('/', protect, createImpact);
router.put('/:id', protect, updateImpact);
router.delete('/:id', protect, deleteImpact);

module.exports = router;
