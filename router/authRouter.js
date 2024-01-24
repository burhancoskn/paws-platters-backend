
import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User, Profile } from '../models/user.js';

const authRouter = express.Router();

// POST Sign Up
authRouter.post('/signup', async (req, res) => {
  try {
    const { username, profilePhoto, email, password, confirmPassword } = req.body;

    // Check if password and confirmPassword match
    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    // Create a profile for the user
    const newProfile = new Profile({
      user: newUser._id,
      profilePhoto,
    });

    // Save the profile to the database
    await newProfile.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error registering user' });
  }
});

authRouter.post('/signin', async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Find the user by email
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
  
      // Compare the password
      const passwordMatch = await bcrypt.compare(password, user.password);
  
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
  
      // Generate JWT token
      const token = jwt.sign(
        { userId: user._id, username: user.username },
        'MY_SECRET_KEY_123!@#$',
        { expiresIn: '1h' }
      );
  
      // Send back the token and user information
      res.status(200).json({
        token,
        user: { username: user.username, email: user.email, _id: user._id },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error signing in' });
    }
  });
  
  

// GET User Profile(s)
authRouter.get('/profile', async (req, res) => {
  try {
    // Assume you have middleware to verify the JWT token and attach the userId to the request
    const userId = req.userId;

    // Check if a specific user ID is provided in the request query
    const requestedUserId = req.query.userId;

    if (requestedUserId) {
      // Retrieve a specific user's profile
      const userProfile = await Profile.findOne({ user: requestedUserId }).populate('user', 'username email');

      if (!userProfile) {
        return res.status(404).json({ error: 'User profile not found' });
      }

      return res.status(200).json(userProfile);
    } else {
      // Retrieve all user profiles
      const allUserProfiles = await Profile.find().populate('user', 'username email');

      return res.status(200).json(allUserProfiles);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error getting user profile(s)' });
  }
});

export default authRouter;