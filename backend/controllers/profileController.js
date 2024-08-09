// backend/controllers/profileController.js
import cloudinary from '../config/cloudinary.js';
import User from '../models/User.js';
import streamifier from 'streamifier';

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
      res.status(404);
      throw new Error('User not found');
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const uploadProfilePicture = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }

    // Upload the image to Cloudinary
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: 'profile_pictures',
        public_id: `${user._id}_profile_picture`,
        overwrite: true,
      },
      async (error, result) => {
        if (result) {
          user.profileImage = result.secure_url;
          await user.save();
          res.json({ profileImage: result.secure_url });
        } else {
          res.status(500).json({ message: error.message });
        }
      }
    );

    streamifier.createReadStream(req.file.buffer).pipe(stream);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
