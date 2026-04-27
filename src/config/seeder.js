const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Category = require('../models/Category');
const Product = require('../models/Product');

dotenv.config();

mongoose.connect(process.env.MONGO_URI);

const categories = [
  { name: 'Electronics' },
  { name: 'Fashion' },
  { name: 'Home Appliances' },
  { name: 'Books' },
];

const products = [
  {
    name: 'iPhone 15 Pro',
    description: 'Latest Apple iPhone with Titanium design.',
    price: 99999,
    brand: 'Apple',
    stock: 10,
    images: ['https://example.com/iphone.jpg'],
    featured: true,
  },
  {
    name: 'MacBook Air M2',
    description: 'Thin and light laptop with Apple Silicon.',
    price: 114900,
    brand: 'Apple',
    stock: 5,
    images: ['https://example.com/macbook.jpg'],
    featured: true,
  },
];

const importData = async () => {
  try {
    await Category.deleteMany();
    await Product.deleteMany();

    const createdCategories = await Category.insertMany(categories);

    const electronicsId = createdCategories[0]._id;

    const sampleProducts = products.map((product) => {
      return { ...product, category: electronicsId };
    });

    await Product.insertMany(sampleProducts);

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Category.deleteMany();
    await Product.deleteMany();

    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
