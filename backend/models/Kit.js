const mongoose = require('mongoose');

const kitSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Kit name is required'],
      trim: true,
      maxlength: [150, 'Kit name cannot exceed 150 characters'],
    },

    slug: {
      type: String,
      required: [true, 'Kit slug is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },

    shortDescription: {
      type: String,
      required: [true, 'Short description is required'],
      trim: true,
      maxlength: [
        300,
        'Short description cannot exceed 300 characters',
      ],
    },

    description: {
      type: String,
      required: [true, 'Full description is required'],
      trim: true,
      maxlength: [
        5000,
        'Full description cannot exceed 5000 characters',
      ],
    },

    image: {
      type: String,
      required: [true, 'Product image is required'],
      trim: true,
    },

    videoUrl: {
      type: String,
      default: '',
      trim: true,
    },

    price: {
      type: Number,
      required: [true, 'Selling price is required'],
      min: [0, 'Selling price cannot be negative'],
    },

    originalPrice: {
      type: Number,
      default: null,
      min: [0, 'Original price cannot be negative'],
    },

    features: {
      type: [String],
      default: [],
    },

    includedItems: {
      type: [String],
      default: [],
    },

    skills: {
      type: [String],
      default: [],
    },

    ageGroup: {
      type: String,
      default: '',
      trim: true,
      maxlength: [100, 'Age group cannot exceed 100 characters'],
    },

    classLevel: {
      type: String,
      default: '',
      trim: true,
      maxlength: [100, 'Class level cannot exceed 100 characters'],
    },

    category: {
      type: String,
      default: 'STEM',
      trim: true,
      maxlength: [50, 'Category cannot exceed 50 characters'],
    },

    stock: {
      type: Number,
      default: 0,
      min: [0, 'Stock cannot be negative'],
    },

    featured: {
      type: Boolean,
      default: false,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    sortOrder: {
      type: Number,
      default: 0,
      min: [0, 'Sort order cannot be negative'],
    },
  },
  {
    timestamps: true,
  }
);

kitSchema.index({
  isActive: 1,
  featured: 1,
  sortOrder: 1,
});

module.exports = mongoose.model('Kit', kitSchema);