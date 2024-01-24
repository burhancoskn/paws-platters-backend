// Assuming you have already imported mongoose and defined a connection
import mongoose from 'mongoose';

// User Schema
const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  });
  
  // Profile Schema
  const profileSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    profilePhoto: { type: String }, // You might want to store the path to the image
    // Additional fields for personal and pet information
    fullName: { type: String },
    birthday: { type: Date },
    joined: { type: Date, default: Date.now },
    phone: { type: String },
    location: { type: String },
    shippingAddress: { type: String },
    petName: { type: String },
    petGender: { type: String },
    petBirthday: { type: Date },
    vaccinated: { type: Boolean },
    castrated: { type: Boolean },
    favoriteFood: { type: String },
  });
  
  // Create models based on the schemas
  const User = mongoose.model('User', userSchema);
  const Profile = mongoose.model('Profile', profileSchema);
  
  export { User, Profile };
  