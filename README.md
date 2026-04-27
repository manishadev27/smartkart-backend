# SmartKart Backend - Product Management System

This is a production-ready backend for a Product Management System built with Node.js, Express, and MongoDB.

## Features

- **Admin Authentication**: JWT based login and profile management.
- **Product Management**: CRUD operations with search, filtering, pagination, and sorting.
- **Category Management**: Organize products into categories.
- **Dashboard**: Quick stats for the administration panel.
- **Image Upload**: Integrated with Multer and Cloudinary.
- **Security**: Password hashing, Helmet, CORS, Rate limiting, and Input validation.
- **Clean Architecture**: MVC structure with separate services and controllers.

---

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Auth**: JWT & bcryptjs
- **Storage**: Cloudinary
- **Validation**: express-validator
- **Security**: Helmet, CORS, express-rate-limit

---

## Getting Started

### Prerequisites

- Node.js (v14+)
- MongoDB (Local or Atlas)
- Cloudinary Account (for image uploads)

### Installation

1. Clone the repository
2. Navigate to the backend folder:
   ```bash
   cd backend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Configure environment variables:
   - Create a `.env` file based on `.env.example`.
   - Add your MongoDB URI and Cloudinary credentials.

### Running the App

- **Development mode**:
  ```bash
  npm run dev
  ```
- **Production mode**:
  ```bash
  npm start
  ```

---

## API Documentation

### Auth APIs
- `POST /api/auth/login`: Login as admin.
- `GET /api/auth/me`: Get current admin profile (Protected).

### Product APIs
- `GET /api/products`: Get all products (supports search, sort, filters, pagination).
- `GET /api/products/:id`: Get single product details.
- `POST /api/products`: Create new product (Protected).
- `PUT /api/products/:id`: Update product (Protected).
- `DELETE /api/products/:id`: Delete product (Protected).

### Category APIs
- `GET /api/categories`: Get all categories.
- `POST /api/categories`: Create category (Protected).
- `PUT /api/categories/:id`: Update category (Protected).
- `DELETE /api/categories/:id`: Delete category (Protected).

### Dashboard & Upload
- `GET /api/dashboard/stats`: Get dashboard statistics (Protected).
- `POST /api/upload`: Upload image to Cloudinary (Protected).

---

## Postman Testing Guide

1. **Login**: Use `admin@smartkart.com` and `Admin@123` to get the JWT token.
2. **Authorization**: For all protected routes, add the token in the `Authorization` header as `Bearer <token>`.
3. **Pagination**: Use `?page=1&limit=10`.
4. **Filtering**: Use `?category=<id>&price[gte]=100&featured=true`.
5. **Sorting**: Use `?sort=price-low` or `?sort=latest`.
6. **Searching**: Use `?search=iphone`.

---

## Deployment Guide

### Deploying to Render / Railway
1. Push your code to a GitHub repository.
2. Connect your repo to Render/Railway.
3. Set the Root Directory to `backend` (if applicable).
4. Add environment variables in the dashboard settings.
5. Build Command: `npm install`
6. Start Command: `npm start`

### Deploying to VPS (Ubuntu)
1. Install Node.js, MongoDB, and PM2.
2. Clone repo and `npm install`.
3. Use PM2 to run the server: `pm2 start server.js --name "smartkart-api"`.
4. Setup Nginx as a reverse proxy to port 5000.
