const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { createLead, getLeads, updateLeadStatus, deleteLead } = require('../controllers/leadController');

router.post('/', createLead);
router.get('/', protect, getLeads);
router.put('/:id', protect, updateLeadStatus);
router.delete('/:id', protect, deleteLead);

module.exports = router;
