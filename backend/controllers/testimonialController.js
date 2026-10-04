const Testimonial = require('../models/Testimonial');
const fs = require('fs');
const path = require('path');

const unlinkIfLocal = (url) => {
  if (url && url.startsWith('/uploads/')) {
    const p = path.join(__dirname, '..', url.replace('/uploads/', 'uploads/'));
    if (fs.existsSync(p)) fs.unlink(p, () => {});
  }
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
  const data = { ...req.body };
  if (req.file) data.photo = `/uploads/${req.file.filename}`;
  const item = await Testimonial.create(data);
  res.status(201).json(item);
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
