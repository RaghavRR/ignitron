const Testimonial = require('../models/Testimonial');
const fs = require('fs');
const path = require('path');

const unlinkIfLocal = (url) => {
  if (!url || !url.startsWith('/uploads/')) return;

  const filePath = path.join(
    __dirname,
    '..',
    url.replace(/^\/uploads\//, 'uploads/')
  );

  fs.unlink(filePath, (err) => {
    if (err && err.code !== 'ENOENT') {
      console.error(
        'Failed to delete old testimonial image:',
        err.code,
        err.message
      );
    }
  });
};
const getTestimonials = async (req, res) => {
  const items = await Testimonial.find({ isPublished: true }).sort({ createdAt: -1 });
  res.json(items);
};

const getTestimonialsAdmin = async (req, res) => {
  const items = await Testimonial.find().sort({ createdAt: -1 });
  res.json(items);
};

const createTestimonial = async (req, res) => {
  try {
    const data = { ...req.body };

    if (req.file) {
      data.photo = `/uploads/${req.file.filename}`;
    }

    const item = await Testimonial.create(data);

    return res.status(201).json(item);
  } catch (error) {
    console.error('Create testimonial error:', error);

    return res.status(500).json({
      message: error.message || 'Failed to create testimonial',
    });
  }
};

const updateTestimonial = async (req, res) => {
  const item = await Testimonial.findById(req.params.id);
  if (!item) return res.status(404).json({ message: 'Testimonial not found' });
  if (req.file) {
    unlinkIfLocal(item.photo);
    item.photo = `/uploads/${req.file.filename}`;
  }
  Object.assign(item, req.body);
  await item.save();
  res.json(item);
};

const deleteTestimonial = async (req, res) => {
  const item = await Testimonial.findById(req.params.id);
  if (!item) return res.status(404).json({ message: 'Testimonial not found' });
  unlinkIfLocal(item.photo);
  await item.deleteOne();
  res.json({ message: 'Testimonial deleted' });
};

module.exports = { getTestimonials, getTestimonialsAdmin, createTestimonial, updateTestimonial, deleteTestimonial };
