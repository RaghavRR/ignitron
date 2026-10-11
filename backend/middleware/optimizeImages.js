const sharp = require('sharp');
const fs = require('fs/promises');
const path = require('path');

async function optimizeOne(file) {
  if (!file) return;
  if (file.mimetype.startsWith('video/')) return;

  // Only compress JPEG, PNG and WebP.
  // Keep GIF, SVG, PDF and videos unchanged.
  const supportedTypes = [
    'image/jpeg',
    'image/png',
    'image/webp',
  ];

  if (!supportedTypes.includes(file.mimetype)) return;

  const originalPath = file.path;
  const parsed = path.parse(originalPath);
  const newFilename = `${parsed.name}.webp`;
  const newPath = path.join(parsed.dir, newFilename);

  // Avoid writing to the same file when the upload is already WebP.
  const tempPath = path.join(
    parsed.dir,
    `${parsed.name}-optimized-${Date.now()}-${Math.random()
      .toString(36)
      .slice(2)}.webp`
  );

  try {
    await sharp(originalPath, {
      limitInputPixels: 40000000,
    })
      .rotate()
      .resize({
        width: 2000,
        height: 2000,
        fit: 'inside',
        withoutEnlargement: true,
      })
      .webp({ quality: 82, effort: 4 })
      .toFile(tempPath);

    // Replace existing file safely, including uploaded WebP files.
    await fs.rename(tempPath, newPath);

if (originalPath !== newPath) {
  try {
    await fs.unlink(originalPath);
  } catch (error) {
    // WebP is already created; don't fail the upload
    // just because Windows cannot delete the original.
    console.warn(
      'Could not delete original image:',
      originalPath,
      error.code
    );
  }
}


    // Controllers use filename/path to save the URL.
    file.filename = newFilename;
    file.path = newPath;
    file.destination = parsed.dir;
    file.size = (await fs.stat(newPath)).size;
    file.mimetype = 'image/webp';
  } catch (error) {
    await fs.unlink(tempPath).catch(() => {});
    throw error;
  }
}

async function optimizeImages(req, res, next) {
  try {
    if (req.file) {
      await optimizeOne(req.file);
    }

    if (req.files && !Array.isArray(req.files)) {
      for (const files of Object.values(req.files)) {
        for (const file of files) {
          await optimizeOne(file);
        }
      }
    }

    next();
  } catch (error) {
    next(error);
  }
}

module.exports = optimizeImages;