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

  // Downloadable file → PDF only
  if (file.fieldname === 'file') {
    if (
      ext === '.pdf' &&
      file.mimetype === 'application/pdf'
    ) {
      return cb(null, true);
    }

    return cb(new Error('Only PDF files are allowed for downloadable file'));
  }

  // Cover image → image/video
  if (file.fieldname === 'coverImage') {
    const allowedExtensions = [
      '.jpeg',
      '.jpg',
      '.png',
      '.webp',
      '.gif',
      '.svg',
      '.mp4',
      '.webm',
    ];

    const allowedMimeTypes = [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/webp',
      'image/gif',
      'image/svg+xml',
      'video/mp4',
      'video/webm',
    ];

    if (
      allowedExtensions.includes(ext) &&
      allowedMimeTypes.includes(file.mimetype)
    ) {
      return cb(null, true);
    }

    return cb(new Error('Only image/video files are allowed for cover image'));
  }

  cb(new Error('Invalid file field'));
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 15 * 1024 * 1024, // 15MB
  },
});

module.exports = upload;