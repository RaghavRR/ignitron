const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    schoolOrg: { type: String, required: true },
    designation: { type: String, default: '' },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    city: { type: String, default: '' },
    interestedIn: {
      type: String,
      enum: [
        'ATL Lab Setup',
        'Innovation Lab',
        'STEM Program',
        'Robotics',
        'DIY Kits',
        'Curriculum',
        'Teacher Training',
        'Workshop',
        'Other',
      ],
      default: 'Other',
    },
    message: { type: String, default: '' },
    status: { type: String, enum: ['New', 'Contacted', 'Converted', 'Closed'], default: 'New' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Lead', leadSchema);
