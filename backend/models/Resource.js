const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    category: {
      type: String,
      enum: ['Project Tutorials', 'STEM & Robotics Guides', 'AI / IoT Learning', 'Teacher Resources', 'Blogs', 'Downloads', 'Competitions'],
      required: true,
    },
    coverImage: { type: String, default: '' },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    fileUrl: { type: String, default: '' },
    metaTitle: { type: String, default: '' },
    metaDescription: { type: String, default: '' },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Resource', resourceSchema);
