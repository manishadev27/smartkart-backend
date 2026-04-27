const dotenv = require('dotenv');
// Load env vars
dotenv.config();

const connectDB = require('./src/config/db');
const app = require('./src/app');
const Admin = require('./src/models/Admin');

// Connect to database
connectDB().then(async () => {
  // Seed default admin if not exists
  const adminExists = await Admin.findOne({ email: process.env.ADMIN_EMAIL || 'admin@smartkart.com' });
  if (!adminExists) {
    await Admin.create({
      name: 'Super Admin',
      email: process.env.ADMIN_EMAIL || 'admin@smartkart.com',
      password: process.env.ADMIN_PASSWORD || 'Admin@123',
      role: 'admin',
    });
    console.log('Default admin seeded successfully');
  }
});

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});
