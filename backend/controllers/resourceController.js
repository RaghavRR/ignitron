const Resource = require('../models/Resource');
const slugify = require('slugify');
const fs = require('fs');
const path = require('path');

const unlinkIfLocal = (url) => {
  if (url && url.startsWith('/uploads/')) {
    const p = path.join(__dirname, '..', url.replace('/uploads/', 'uploads/'));
    if (fs.existsSync(p)) fs.unlink(p, () => {});
  }
};

const getResources = async (req, res) => {
  const { category, search } = req.query;
  const filter = { isPublished: true };
  if (category && category !== 'All') filter.category = category;
  if (search) filter.title = { $regex: search, $options: 'i' };
  const items = await Resource.find(filter).sort({ createdAt: -1 });
  res.json(items);
};

const getResourcesAdmin = async (req, res) => {
  const items = await Resource.find().sort({ createdAt: -1 });
  res.json(items);
};

const getResourceBySlug = async (req, res) => {
  const item = await Resource.findOne({ slug: req.params.slug });
  if (!item) return res.status(404).json({ message: 'Resource not found' });
  res.json(item);
};

const createResource = async (req, res) => {
  const data = { ...req.body };
  if (req.files?.coverImage) data.coverImage = `/uploads/${req.files.coverImage[0].filename}`;
  if (req.files?.file) data.fileUrl = `/uploads/${req.files.file[0].filename}`;
  data.slug = slugify(data.title, { lower: true, strict: true });
  const item = await Resource.create(data);
  res.status(201).json(item);
};

const updateResource = async (req, res) => {
  const item = await Resource.findById(req.params.id);
  if (!item) return res.status(404).json({ message: 'Resource not found' });
  const data = { ...req.body };
  if (req.files?.coverImage) {
    unlinkIfLocal(item.coverImage);
    data.coverImage = `/uploads/${req.files.coverImage[0].filename}`;
  }
  if (req.files?.file) {
    unlinkIfLocal(item.fileUrl);
    data.fileUrl = `/uploads/${req.files.file[0].filename}`;
  }
  if (data.title) data.slug = slugify(data.title, { lower: true, strict: true });
  Object.assign(item, data);
  await item.save();
  res.json(item);
};

const deleteResource = async (req, res) => {
  const item = await Resource.findById(req.params.id);
  if (!item) return res.status(404).json({ message: 'Resource not found' });
  unlinkIfLocal(item.coverImage);
  unlinkIfLocal(item.fileUrl);
  await item.deleteOne();
  res.json({ message: 'Resource deleted' });
};

module.exports = {
  getResources,
  getResourcesAdmin,
  getResourceBySlug,
  createResource,
  updateResource,
  deleteResource,
};
