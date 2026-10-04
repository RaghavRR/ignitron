require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middleware/errorHandler');

connectDB();

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
  })
);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// basic rate limiting on the public lead form to reduce spam
const leadLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 20 });
app.use('/api/leads', leadLimiter);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/api/health', (req, res) => res.json({ status: 'ok', message: 'IGNITRON API running' }));

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/images', require('./routes/imageRoutes'));
app.use('/api/projects', require('./routes/projectRoutes'));
app.use('/api/gallery', require('./routes/galleryRoutes'));
app.use('/api/testimonials', require('./routes/testimonialRoutes'));
app.use('/api/resources', require('./routes/resourceRoutes'));
app.use('/api/impact', require('./routes/impactRoutes'));
app.use('/api/leads', require('./routes/leadRoutes'));
app.use('/api/kits', require('./routes/kitRoutes'));

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`IGNITRON backend running on port ${PORT}`));
