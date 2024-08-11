import request from 'supertest';
import mongoose from 'mongoose';
import app from '../server.js'; // Adjust the path if necessary
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.test' });

beforeAll(async () => {
  // Connect to the test database
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  // Clean up and close the database connection
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

describe('Admin Routes', () => {
  let adminToken;
  let userId;

  beforeAll(async () => {
    // Create an admin user and get a token
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('adminpassword', salt);

    // Check if the admin already exists
    const existingAdmin = await User.findOne({ email: 'admin@example.com' });
    if (!existingAdmin) {
      const admin = new User({
        name: 'Admin User',
        email: 'admin@example.com',
        password: hashedPassword,
        isAdmin: true,
      });

      await admin.save();
    }

    // Login as admin to get a token
    const loginResponse = await request(app)
      .post('/api/users/login')
      .send({ email: 'admin@example.com', password: 'adminpassword' });

    adminToken = loginResponse.body.token;

    // Create a test user for admin operations
    const testUser = new User({
      name: 'Test User',
      email: 'testuser@example.com',
      password: hashedPassword,
      isAdmin: false,
    });

    await testUser.save();
    userId = testUser._id;
  });

  test('GET /api/admin/users - should fetch all users', async () => {
    const response = await request(app)
      .get('/api/admin/users')
      .set('Authorization', `Bearer ${adminToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThan(0); // Ensure at least one user is present
  });

  test('PUT /api/admin/users/:id - should update a user', async () => {
    const response = await request(app)
      .put(`/api/admin/users/${userId}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ isAdmin: true });

    expect(response.status).toBe(200);
    expect(response.body.isAdmin).toBe(true);
  });

  test('DELETE /api/admin/users/:id - should delete a user', async () => {
    const response = await request(app)
      .delete(`/api/admin/users/${userId}`)
      .set('Authorization', `Bearer ${adminToken}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('User deleted');
  });
});
