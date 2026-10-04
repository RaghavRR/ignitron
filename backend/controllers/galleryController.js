const GalleryItem = require('../models/GalleryItem');
const fs = require('fs');
const path = require('path');

const unlinkIfLocal = (url) => {
  if (url && url.startsWith('/uploads/')) {
    const p = path.join(__dirname, '..', url.replace('/uploads/', 'uploads/'));
    if (fs.existsSync(p)) fs.unlink(p, () => {});
  }
};

const getGallery = async (req, res) => {
  const { category } = req.query;
  const filter = { isPublished: true };
  if (category && category !== 'All') filter.category = category;
  const items = await GalleryItem.find(filter).sort({ createdAt: -1 });
  res.json(items);
};

const getGalleryAdmin = async (req, res) => {
  const items = await GalleryItem.find().sort({ createdAt: -1 });
  res.json(items);
};

const createGalleryItem = async (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'Media file is required' });
  const item = await GalleryItem.create({
    ...req.body,
    mediaUrl: `/uploads/${req.file.filename}`,
  });
  res.status(201).json(item);
};

const updateGalleryItem = async (req, res) => {
  const item = await GalleryItem.findById(req.params.id);
  if (!item) return res.status(404).json({ message: 'Gallery item not found' });
  if (req.file) {
    unlinkIfLocal(item.mediaUrl);
    item.mediaUrl = `/uploads/${req.file.filename}`;
  }
  Object.assign(item, req.body);
  await item.save();
  res.json(item);
};

const deleteGalleryItem = async (req, res) => {
  const item = await GalleryItem.findById(req.params.id);
  if (!item) return res.status(404).json({ message: 'Gallery item not found' });
  unlinkIfLocal(item.mediaUrl);
  await item.deleteOne();
  res.json({ message: 'Gallery item deleted' });
};

module.exports = { getGallery, getGalleryAdmin, createGalleryItem, updateGalleryItem, deleteGalleryItem };
