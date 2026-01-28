const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const path = require('path');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Create express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ✅ Serve static files for uploads (images/videos)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Base API prefix
const API_PREFIX = '/api/v1';

// Route Imports
const adminRoutes = require('./routes/adminRoutes');
const productRoutes = require('./routes/productRoutes');
const aboutUsRoutes = require('./routes/aboutusRoutes');
const productGalleryRoutes = require('./routes/product_gallery_routes.js');
const contactRoutes = require('./routes/contactRoutes');

// Route Usage
app.use(`${API_PREFIX}/admin`, adminRoutes);
app.use(`${API_PREFIX}/products`, productRoutes);
app.use(`${API_PREFIX}/about-us`, aboutUsRoutes);
app.use(`${API_PREFIX}/product-gallery`, productGalleryRoutes);
app.use(`${API_PREFIX}/admin-contact`, contactRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('Welcome to Dreamz Food Exports API');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
