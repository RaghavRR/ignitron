const Impact = require('../models/Impact');

const getImpact = async (req, res) => {
  const items = await Impact.find().sort({ order: 1 });
  res.json(items);
};

const createImpact = async (req, res) => {
  const item = await Impact.create(req.body);
  res.status(201).json(item);
};

const updateImpact = async (req, res) => {
  const item = await Impact.findById(req.params.id);
  if (!item) return res.status(404).json({ message: 'Impact stat not found' });
  Object.assign(item, req.body);
  await item.save();
  res.json(item);
};

const deleteImpact = async (req, res) => {
  const item = await Impact.findById(req.params.id);
  if (!item) return res.status(404).json({ message: 'Impact stat not found' });
  await item.deleteOne();
  res.json({ message: 'Impact stat deleted' });
};

module.exports = { getImpact, createImpact, updateImpact, deleteImpact };
