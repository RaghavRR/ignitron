const SiteImage = require('../models/SiteImage');
const fs = require('fs');
const path = require('path');

// GET /api/images  -> all site images (used by admin panel)
const getAllImages = async (req, res) => {
  const images = await SiteImage.find().sort({ page: 1, label: 1 });
  res.json(images);
};

// GET /api/images/:key -> single image by key (used by frontend EditableImage)
const getImageByKey = async (req, res) => {
  const image = await SiteImage.findOne({ key: req.params.key });
  if (!image) return res.status(404).json({ message: 'Image slot not found' });
  res.json(image);
};

// POST /api/images  -> create a new image slot (admin)
const createImage = async (req, res) => {
  const { key, label, page, altText } = req.body;
  if (!req.file) return res.status(400).json({ message: 'Image file is required' });

  const exists = await SiteImage.findOne({ key });
  if (exists) return res.status(400).json({ message: 'An image with this key already exists' });

  const imageUrl = `/uploads/${req.file.filename}`;
  const image = await SiteImage.create({ key, label, page, altText, imageUrl });
  res.status(201).json(image);
};

// PUT /api/images/:key -> replace the photo for an existing slot (core admin feature)
const updateImage = async (req, res) => {
  const image = await SiteImage.findOne({ key: req.params.key });
  if (!image) return res.status(404).json({ message: 'Image slot not found' });

  if (req.file) {
    const oldPath = path.join(__dirname, '..', image.imageUrl.replace('/uploads/', 'uploads/'));
    if (fs.existsSync(oldPath)) fs.unlink(oldPath, () => {});
    image.imageUrl = `/uploads/${req.file.filename}`;
  }
  if (req.body.label) image.label = req.body.label;
  if (req.body.altText !== undefined) image.altText = req.body.altText;

  await image.save();
  res.json(image);
};

// DELETE /api/images/:key
const deleteImage = async (req, res) => {
  const image = await SiteImage.findOne({ key: req.params.key });
  if (!image) return res.status(404).json({ message: 'Image slot not found' });
  const filePath = path.join(__dirname, '..', image.imageUrl.replace('/uploads/', 'uploads/'));
  if (fs.existsSync(filePath)) fs.unlink(filePath, () => {});
  await image.deleteOne();
  res.json({ message: 'Image slot deleted' });
};

module.exports = { getAllImages, getImageByKey, createImage, updateImage, deleteImage };
