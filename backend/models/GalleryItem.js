const mongoose = require('mongoose');

const galleryItemSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    type: { type: String, enum: ['image', 'video'], default: 'image' },
    mediaUrl: { type: String, required: true },
    thumbnailUrl: { type: String, default: '' },
    category: {
      type: String,
      enum: ['Workshops', 'Robotics', 'Innovation Labs', 'Student Projects', 'Competitions', 'Events'],
      required: true,
    },
    caption: { type: String, default: '' },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('GalleryItem', galleryItemSchema);
