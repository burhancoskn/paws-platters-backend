import mongoose from 'mongoose';
const categorySchema = new mongoose.Schema({
  categoryId: {
    type: Number,
    required: true,
    unique: true,
  },
  categoryName: {
    type: String,
    required: true,
  },
  categoryImg: String,
});
const productSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  gift: String,
  subtitle: String,
  sale: {
    type: Boolean,
    default: false,
  },
  newProduct: {
    type: Boolean,
    default: false,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  },
  brand: String,
  price: {
    type: Number,
    required: true,
  },
  img: String,
  desc: String,
});
const Category = mongoose.model('Category', categorySchema);

const menu = mongoose.model('menu', productSchema);

export { menu,Category  };
