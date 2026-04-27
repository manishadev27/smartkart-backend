const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const path = require('path');
const fs = require('fs');
const errorHandler = require('./middlewares/error');

// Route files
const authRoutes = require('./routes/authRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const userAuthRoutes = require('./routes/userAuthRoutes');
const profileRoutes = require('./routes/profileRoutes');
const cartRoutes = require('./routes/cartRoutes');
const wishlistRoutes = require('./routes/wishlistRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();

// Trust proxy - Essential for Render/Heroku/Cloudflare to work with rate limiting
app.set('trust proxy', 1);

// Create uploads directory if it doesn't exist
const uploadDir = path.join(__dirname, 'public/uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Body parser
app.use(express.json());

// Enable CORS
app.use(cors());

// Set security headers
app.use(helmet({
  crossOriginResourcePolicy: false, // Essential for serving images locally
}));

// Static folder
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 mins
  max: 100,
});
app.use('/api', limiter);

// Mount routers
app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/upload', uploadRoutes);

// User/Customer Routes
app.use('/api/user/auth', userAuthRoutes);
app.use('/api/user/profile', profileRoutes);
app.use('/api/user/cart', cartRoutes);
app.use('/api/user/wishlist', wishlistRoutes);
app.use('/api/user/orders', orderRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({ success: true, message: 'Welcome to SmartKart API' });
});

// Central Error Handler
app.use(errorHandler);

module.exports = app;
