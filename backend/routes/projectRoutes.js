const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { protect } = require('../middleware/auth');
const {
  getProjects,
  getProjectsAdmin,
  getProjectBySlug,
  createProject,
  updateProject,
  deleteProject,
} = require('../controllers/projectController');

const cpUpload = upload.fields([{ name: 'coverImage', maxCount: 1 }, { name: 'circuitDiagram', maxCount: 1 }]);

router.get('/', getProjects);
router.get('/admin/all', protect, getProjectsAdmin);
router.get('/:slug', getProjectBySlug);
router.post('/', protect, cpUpload, createProject);
router.put('/:id', protect, cpUpload, updateProject);
router.delete('/:id', protect, deleteProject);

module.exports = router;
