import express from 'express';
import { menu as Product, Category  } from "../models/menu.js";
const shopRouter = express.Router();

// GET all products
shopRouter.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
shopRouter.get('/categories', async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving categories' });
  }
});
// GET a specific product by ID
shopRouter.get('/:id', getProduct, (req, res) => {
  res.json(res.product);
});
// GET products by category ID
shopRouter.get('/category/:categoryId', async (req, res) => {
  const categoryId = req.params.categoryId;

  try {
    // Find products that belong to the specified category ID
    const productsInCategory = await Product.find({ category: categoryId });

    if (productsInCategory.length === 0) {
      return res.status(404).json({ message: 'No products found in the specified category' });
    }

    res.status(200).json(productsInCategory);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving products by category' });
  }
});

// POST a new product
shopRouter.post('/menu', async (req, res) => {
  const product = new Product({
    ...req.body
  });

  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
shopRouter.post('/categories', async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ error: 'Error creating Category' });
  }
});

// DELETE a product by ID
shopRouter.delete('/:id', getProduct, async (req, res) => {
  try {
    await res.product.deleteOne({ _id: req.params.id });
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
shopRouter.delete('/categories/:id', async (req, res) => {
  const categoryId = req.params.categoryId;

  try {
    const deletedCategory = await Category.findOneAndDelete({ categoryId });

    if (deletedCategory) {
      res.status(200).json({ message: 'Category deleted successfully', deletedCategory });
    } else {
      res.status(404).json({ error: 'Category not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error deleting category' });
  }
});

// Middleware function to get a product by ID
async function getProduct(req, res, next) {
  let product;

  try {
    product = await Product.findById(req.params.id);

    if (product == null) {
      return res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  res.product = product;
  next();
}

export default  shopRouter;
