import User from '../models/User.js';

export const getAllUsers = async (req, res) => {
  console.log('Fetching all users (admin only)');
  try {
    const users = await User.find().select('-password');
    console.log('Users fetched:', users.length);
    res.json(users);
  } catch (error) {
    console.error('Error fetching all users:', error.message);
    res.status(500).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  console.log('Updating user by ID (admin only):', req.params.id);
  const { isAdmin } = req.body;

  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      console.log('User not found:', req.params.id);
      return res.status(404).json({ message: 'User not found' });
    }

    user.isAdmin = isAdmin !== undefined ? isAdmin : user.isAdmin;

    const updatedUser = await user.save();
    console.log('User updated:', updatedUser._id);
    res.json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error.message);
    res.status(500).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  console.log('Deleting user by ID (admin only):', req.params.id);
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      console.log('User not found for deletion:', req.params.id);
      return res.status(404).json({ message: 'User not found' });
    }
    console.log('User deleted:', req.params.id);
    res.json({ message: 'User deleted' });
  } catch (error) {
    console.error('Error deleting user:', error.message);
    res.status(500).json({ message: error.message });
  }
};
