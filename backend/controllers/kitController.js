const Kit = require('../models/Kit');


// ==========================================
// VALIDATION HELPERS
// ==========================================

const isValidUrl = (value) => {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
};

const getValidationMessage = (error) => {
  if (error.name === 'ValidationError') {
    const firstError = Object.values(error.errors)[0];

    return firstError?.message || 'Please check the entered information';
  }

  if (error.code === 11000) {
    return 'A kit with this name already exists';
  }

  if (error.name === 'CastError') {
    return `Invalid ${error.path}`;
  }

  return 'Something went wrong. Please try again.';
};



const generateSlug = (name) => {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

// ==========================================
// PUBLIC - GET ACTIVE KITS
// ==========================================
const getPublicKits = async (req, res) => {
  try {
    const kits = await Kit.find({ isActive: true })
      .sort({ sortOrder: 1, createdAt: -1 })
      .lean();

    res.status(200).json({
      success: true,
      data: kits,
    });
  } catch (error) {
    console.error('Get public kits error:', error);

    res.status(500).json({
      success: false,
      message: 'Failed to fetch kits',
    });
  }
};

// ==========================================
// ADMIN - GET ALL KITS
// ==========================================
const getAdminKits = async (req, res) => {
  try {
    const kits = await Kit.find()
      .sort({ sortOrder: 1, createdAt: -1 })
      .lean();

    res.status(200).json({
      success: true,
      data: kits,
    });
  } catch (error) {
    console.error('Get admin kits error:', error);

    res.status(500).json({
      success: false,
      message: 'Failed to fetch kits',
    });
  }
};

// ==========================================
// GET SINGLE KIT BY ID
// ==========================================
const getKitById = async (req, res) => {
  try {
    const kit = await Kit.findById(req.params.id);

    if (!kit) {
      return res.status(404).json({
        success: false,
        message: 'Kit not found',
      });
    }

    res.status(200).json({
      success: true,
      data: kit,
    });
  } catch (error) {
    console.error('Get kit error:', error);

    res.status(500).json({
      success: false,
      message: 'Failed to fetch kit',
    });
  }
};

// ==========================================
// GET SINGLE KIT BY SLUG
// ==========================================
const getKitBySlug = async (req, res) => {
  try {
    const kit = await Kit.findOne({
      slug: req.params.slug,
      isActive: true,
    });

    if (!kit) {
      return res.status(404).json({
        success: false,
        message: 'Kit not found',
      });
    }

    res.status(200).json({
      success: true,
      data: kit,
    });
  } catch (error) {
    console.error('Get kit by slug error:', error);

    res.status(500).json({
      success: false,
      message: 'Failed to fetch kit',
    });
  }
};

// ==========================================
// ADMIN - CREATE KIT
// ==========================================
const createKit = async (req, res) => {
  try {
    const {
      name,
      shortDescription,
      description,
      image,
      videoUrl,
      price,
      originalPrice,
      features,
      includedItems,
      skills,
      ageGroup,
      classLevel,
      category,
      stock,
      featured,
      isActive,
      sortOrder,
    } = req.body;

    // ==========================================
    // REQUIRED FIELDS
    // ==========================================

    if (!name?.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Kit name is required',
      });
    }

    if (!shortDescription?.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Short description is required',
      });
    }

    if (!description?.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Full description is required',
      });
    }

    if (!image?.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Product image is required',
      });
    }

    // ==========================================
    // LENGTH VALIDATION
    // ==========================================

    if (name.trim().length > 150) {
      return res.status(400).json({
        success: false,
        message: 'Kit name cannot exceed 150 characters',
      });
    }

    if (shortDescription.trim().length > 300) {
      return res.status(400).json({
        success: false,
        message:
          'Short description cannot exceed 300 characters',
      });
    }

    if (description.trim().length > 5000) {
      return res.status(400).json({
        success: false,
        message:
          'Full description cannot exceed 5000 characters',
      });
    }

    // ==========================================
    // IMAGE URL
    // ==========================================

 if (!image?.trim()) {
  return res.status(400).json({
    success: false,
    message: 'Product image is required',
  });
}

    // ==========================================
    // VIDEO URL
    // ==========================================

    if (videoUrl?.trim() && !isValidUrl(videoUrl.trim())) {
      return res.status(400).json({
        success: false,
        message: 'Please enter a valid video URL',
      });
    }

    // ==========================================
    // PRICE
    // ==========================================

    if (
      price === undefined ||
      price === '' ||
      Number.isNaN(Number(price))
    ) {
      return res.status(400).json({
        success: false,
        message: 'Selling price is required',
      });
    }

    const numericPrice = Number(price);

    if (numericPrice < 0) {
      return res.status(400).json({
        success: false,
        message: 'Selling price cannot be negative',
      });
    }

    // ==========================================
    // ORIGINAL PRICE
    // ==========================================

    let numericOriginalPrice = null;

    if (
      originalPrice !== undefined &&
      originalPrice !== '' &&
      originalPrice !== null
    ) {
      numericOriginalPrice = Number(originalPrice);

      if (
        Number.isNaN(numericOriginalPrice) ||
        numericOriginalPrice < 0
      ) {
        return res.status(400).json({
          success: false,
          message: 'Original price must be a valid positive number',
        });
      }
    }

    // ==========================================
    // STOCK
    // ==========================================

    const numericStock =
      stock === undefined || stock === ''
        ? 0
        : Number(stock);

    if (
      Number.isNaN(numericStock) ||
      numericStock < 0
    ) {
      return res.status(400).json({
        success: false,
        message: 'Stock must be a valid non-negative number',
      });
    }

    // ==========================================
    // SORT ORDER
    // ==========================================

    const numericSortOrder =
      sortOrder === undefined || sortOrder === ''
        ? 0
        : Number(sortOrder);

    if (
      Number.isNaN(numericSortOrder) ||
      numericSortOrder < 0
    ) {
      return res.status(400).json({
        success: false,
        message: 'Sort order must be a valid non-negative number',
      });
    }

    // ==========================================
    // SLUG
    // ==========================================

    let slug = generateSlug(name);

    if (!slug) {
      return res.status(400).json({
        success: false,
        message: 'Please enter a valid kit name',
      });
    }

    const existingKit = await Kit.findOne({ slug });

    if (existingKit) {
      slug = `${slug}-${Date.now()}`;
    }

    // ==========================================
    // CREATE KIT
    // ==========================================

    const kit = await Kit.create({
      name: name.trim(),
      slug,

      shortDescription: shortDescription.trim(),
      description: description.trim(),

      image: image.trim(),
      videoUrl: videoUrl?.trim() || '',

      price: numericPrice,
      originalPrice: numericOriginalPrice,

      features: Array.isArray(features)
        ? features
            .map((item) => String(item).trim())
            .filter(Boolean)
        : [],

      includedItems: Array.isArray(includedItems)
        ? includedItems
            .map((item) => String(item).trim())
            .filter(Boolean)
        : [],

      skills: Array.isArray(skills)
        ? skills
            .map((item) => String(item).trim())
            .filter(Boolean)
        : [],

      ageGroup: ageGroup?.trim() || '',
      classLevel: classLevel?.trim() || '',
      category: category?.trim() || 'STEM',

      stock: numericStock,

      featured: Boolean(featured),

      isActive:
        isActive !== undefined
          ? Boolean(isActive)
          : true,

      sortOrder: numericSortOrder,
    });

    return res.status(201).json({
      success: true,
      message: 'Kit created successfully',
      data: kit,
    });
  } catch (error) {
    console.error('Create kit error:', error);

    return res.status(
      error.name === 'ValidationError' ||
        error.code === 11000
        ? 400
        : 500
    ).json({
      success: false,
      message: getValidationMessage(error),
    });
  }
};

// ==========================================
// ADMIN - UPDATE KIT
// ==========================================
const updateKit = async (req, res) => {
  try {
    const kit = await Kit.findById(req.params.id);

    if (!kit) {
      return res.status(404).json({
        success: false,
        message: 'Kit not found',
      });
    }

    const {
      name,
      shortDescription,
      description,
      image,
      videoUrl,
      price,
      originalPrice,
      features,
      includedItems,
      skills,
      ageGroup,
      classLevel,
      category,
      stock,
      featured,
      isActive,
      sortOrder,
    } = req.body;

    if (name !== undefined && !name.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Kit name cannot be empty',
      });
    }

    // Update slug only if name changed
    let slug = kit.slug;

    if (name && name.trim() !== kit.name) {
      slug = generateSlug(name);

      const duplicateKit = await Kit.findOne({
        slug,
        _id: { $ne: kit._id },
      });

      if (duplicateKit) {
        slug = `${slug}-${Date.now()}`;
      }
    }

    kit.name = name !== undefined ? name : kit.name;
    kit.slug = slug;

    kit.shortDescription =
      shortDescription !== undefined
        ? shortDescription
        : kit.shortDescription;

    kit.description =
      description !== undefined
        ? description
        : kit.description;

    kit.image =
      image !== undefined
        ? image
        : kit.image;

    kit.videoUrl =
      videoUrl !== undefined
        ? videoUrl
        : kit.videoUrl;

    if (price !== undefined && price !== '') {
      const numericPrice = Number(price);

      if (Number.isNaN(numericPrice) || numericPrice < 0) {
        return res.status(400).json({
          success: false,
          message: 'Price must be a valid positive number',
        });
      }

      kit.price = numericPrice;
    }

    if (originalPrice !== undefined) {
      kit.originalPrice =
        originalPrice === '' || originalPrice === null
          ? null
          : Number(originalPrice);
    }

    if (features !== undefined) {
      kit.features = Array.isArray(features) ? features : [];
    }

    if (includedItems !== undefined) {
      kit.includedItems = Array.isArray(includedItems)
        ? includedItems
        : [];
    }

    if (skills !== undefined) {
      kit.skills = Array.isArray(skills) ? skills : [];
    }

    if (ageGroup !== undefined) {
      kit.ageGroup = ageGroup;
    }

    if (classLevel !== undefined) {
      kit.classLevel = classLevel;
    }

    if (category !== undefined) {
      kit.category = category;
    }

    if (stock !== undefined && stock !== '') {
      kit.stock = Number(stock);
    }

    if (featured !== undefined) {
      kit.featured = Boolean(featured);
    }

    if (isActive !== undefined) {
      kit.isActive = Boolean(isActive);
    }

    if (sortOrder !== undefined && sortOrder !== '') {
      kit.sortOrder = Number(sortOrder);
    }

    await kit.save();

    res.status(200).json({
      success: true,
      message: 'Kit updated successfully',
      data: kit,
    });
  } catch (error) {
    console.error('Update kit error:', error);

    res.status(500).json({
      success: false,
      message: 'Failed to update kit',
    });
  }
};

// ==========================================
// ADMIN - DELETE KIT
// ==========================================
const deleteKit = async (req, res) => {
  try {
    const kit = await Kit.findById(req.params.id);

    if (!kit) {
      return res.status(404).json({
        success: false,
        message: 'Kit not found',
      });
    }

    await Kit.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Kit deleted successfully',
    });
  } catch (error) {
    console.error('Delete kit error:', error);

    res.status(500).json({
      success: false,
      message: 'Failed to delete kit',
    });
  }
};

module.exports = {
  getPublicKits,
  getAdminKits,
  getKitById,
  getKitBySlug,
  createKit,
  updateKit,
  deleteKit,
};