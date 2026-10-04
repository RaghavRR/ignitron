const mongoose = require('mongoose');

// Every editable photo on the website is stored here against a unique "key".
// Frontend requests /api/images/:key to render the current image for that slot.
const siteImageSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true, index: true },
    label: { type: String, required: true },
    page: { type: String, default: 'general' },
    imageUrl: { type: String, required: true },
    altText: { type: String, default: '' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('SiteImage', siteImageSchema);
