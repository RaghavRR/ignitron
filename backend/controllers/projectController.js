const Project = require('../models/Project');
const slugify = require('slugify');
const fs = require('fs');
const path = require('path');

const unlinkIfLocal = (url) => {
  if (url && url.startsWith('/uploads/')) {
    const p = path.join(__dirname, '..', url.replace('/uploads/', 'uploads/'));
    if (fs.existsSync(p)) fs.unlink(p, () => {});
  }
};

// GET /api/projects  (public, supports filters + search)
const getProjects = async (req, res) => {
  const { category, difficulty, search, featured } = req.query;
  const filter = { isPublished: true };
  if (category && category !== 'All') filter.category = category;
  if (difficulty && difficulty !== 'All') filter.difficulty = difficulty;
  if (featured === 'true') filter.isFeatured = true;
  if (search) filter.$text = { $search: search };

  const projects = await Project.find(filter).sort({ createdAt: -1 });
  res.json(projects);
};

// GET /api/projects/admin  (admin - includes unpublished)
const getProjectsAdmin = async (req, res) => {
  const projects = await Project.find().sort({ createdAt: -1 });
  res.json(projects);
};

// GET /api/projects/:slug
const getProjectBySlug = async (req, res) => {
  const project = await Project.findOne({ slug: req.params.slug }).populate('relatedProjects', 'title slug coverImage difficulty');
  if (!project) return res.status(404).json({ message: 'Project not found' });
  res.json(project);
};

// POST /api/projects (admin)
const createProject = async (req, res) => {
  const data = { ...req.body };
  if (req.files?.coverImage) data.coverImage = `/uploads/${req.files.coverImage[0].filename}`;
  if (req.files?.circuitDiagram) data.circuitDiagram = `/uploads/${req.files.circuitDiagram[0].filename}`;

  ['technologies', 'skills', 'whatYouLearn', 'howToMake', 'upgradeIdeas', 'components', 'troubleshooting'].forEach((f) => {
    if (typeof data[f] === 'string') {
      try { data[f] = JSON.parse(data[f]); } catch { data[f] = []; }
    }
  });

  data.slug = slugify(data.title, { lower: true, strict: true });
  const project = await Project.create(data);
  res.status(201).json(project);
};

// PUT /api/projects/:id (admin)
const updateProject = async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) return res.status(404).json({ message: 'Project not found' });

  const data = { ...req.body };
  if (req.files?.coverImage) {
    unlinkIfLocal(project.coverImage);
    data.coverImage = `/uploads/${req.files.coverImage[0].filename}`;
  }
  if (req.files?.circuitDiagram) {
    unlinkIfLocal(project.circuitDiagram);
    data.circuitDiagram = `/uploads/${req.files.circuitDiagram[0].filename}`;
  }
  ['technologies', 'skills', 'whatYouLearn', 'howToMake', 'upgradeIdeas', 'components', 'troubleshooting'].forEach((f) => {
    if (typeof data[f] === 'string') {
      try { data[f] = JSON.parse(data[f]); } catch { delete data[f]; }
    }
  });
  if (data.title) data.slug = slugify(data.title, { lower: true, strict: true });

  Object.assign(project, data);
  await project.save();
  res.json(project);
};

// DELETE /api/projects/:id (admin)
const deleteProject = async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) return res.status(404).json({ message: 'Project not found' });
  unlinkIfLocal(project.coverImage);
  unlinkIfLocal(project.circuitDiagram);
  await project.deleteOne();
  res.json({ message: 'Project deleted' });
};

module.exports = {
  getProjects,
  getProjectsAdmin,
  getProjectBySlug,
  createProject,
  updateProject,
  deleteProject,
};
