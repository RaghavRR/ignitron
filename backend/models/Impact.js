const mongoose = require('mongoose');

const impactSchema = new mongoose.Schema(
  {
    label: { type: String, required: true },
    value: { type: Number, required: true },
    suffix: { type: String, default: '+' },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Impact', impactSchema);
