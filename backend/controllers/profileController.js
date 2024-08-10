import cloudinary from '../config/cloudinary.js';
import User from '../models/User.js';
import streamifier from 'streamifier';

// Get user profile
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update user profile information
export const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.phone = req.body.phone || user.phone;
      user.contactPreference = req.body.contactPreference || user.contactPreference;
      user.goals = req.body.goals || user.goals;

      const updatedUser = await user.save();
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        phone: updatedUser.phone,
        contactPreference: updatedUser.contactPreference,
        goals: updatedUser.goals,
        profileImage: updatedUser.profileImage,
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Upload profile picture
export const uploadProfilePicture = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Log Cloudinary configuration and user info
    console.log('Uploading profile image for user:', user._id);
    console.log('Cloudinary Config:', {
      cloud_name: cloudinary.config().cloud_name,
      api_key: cloudinary.config().api_key,
      api_secret: cloudinary.config().api_secret,
    });
    console.log('File Buffer Length:', req.file.buffer.length);

    const stream = cloudinary.uploader.upload_stream(
      {
        folder: 'profile_pictures',
        public_id: `${user._id}_profile_picture`,
        overwrite: true,
      },
      async (error, result) => {
        if (error) {
          console.error('Cloudinary upload error:', error);
          return res.status(500).json({ message: 'Cloudinary upload error' });
        }

        if (result) {
          user.profileImage = result.secure_url;
          await user.save();
          return res.json({ profileImage: result.secure_url });
        } else {
          console.error('No result from Cloudinary');
          return res.status(500).json({ message: 'No result from Cloudinary' });
        }
      }
    );

    console.log('Creating stream to Cloudinary');
    streamifier.createReadStream(req.file.buffer).pipe(stream);

  } catch (error) {
    console.error('Server error:', error.message);
    return res.status(500).json({ message: error.message });
  }
};
