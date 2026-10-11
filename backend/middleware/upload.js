const multer = require('multer');
const path = require('path');
const fs = require('fs');

const uploadDir = path.join(__dirname, '..', 'uploads');

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },

  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();

    const base = path
      .basename(file.originalname, ext)
      .replace(/[^a-zA-Z0-9-_]/g, '');

    cb(null, `${base}-${Date.now()}${ext}`);
  },
});

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();

  // Downloadable file: PDF only
  if (file.fieldname === 'file') {
    if (ext === '.pdf' && file.mimetype === 'application/pdf') {
      return cb(null, true);
    }

    return cb(new Error('Only PDF files are allowed'));
  }

  // Supported image/video upload fields
const mediaFields = [
  'image',
  'imageFiles',
  'media',
  'coverImage',
  'circuitDiagram',
  'photo',
];

  if (!mediaFields.includes(file.fieldname)) {
    return cb(new Error('Invalid file field'));
  }

  const allowedTypes = {
    '.jpg': ['image/jpeg'],
    '.jpeg': ['image/jpeg'],
    '.png': ['image/png'],
    '.webp': ['image/webp'],
    '.gif': ['image/gif'],
    '.svg': ['image/svg+xml'],
    '.mp4': ['video/mp4'],
    '.webm': ['video/webm'],
  };

  const validMimes = allowedTypes[ext];

  if (!validMimes || !validMimes.includes(file.mimetype)) {
    return cb(new Error('Unsupported image or video format'));
  }

  cb(null, true);
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 15 * 1024 * 1024, // 15MB
  },
});

module.exports = upload;