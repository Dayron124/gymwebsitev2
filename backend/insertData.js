import { connect } from 'mongoose';
import User from './models/User.js';
import Class from './models/Class.js';
import Workout from './models/Workout.js';
import Competition from './models/Competition.js';
import Tracker from './models/Tracker.js';
import Blog from './models/Blog.js';
import Product from './models/Product.js';
import Forum from './models/Forum.js';
import { config } from 'dotenv.js';

// Load environment variables
config();

// Connect to MongoDB
const connectDB = async () => {
  try {
    await connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected');
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

const insertData = async () => {
  await connectDB();

  // Create a new user
  const user = new User({
    name: "John Doe",
    email: "johndoe@example.com",
    password: "$2a$10$7qVhjUQeTxC7EjPJD3slYefD4/n74jBoT8X/pC65i1jG.vdGQplPe",  // bcrypt hash of "password123"
    profile: {
      goals: "Lose weight",
      calories: 2000,
    },
    badges: [
      {
        name: "First Workout",
        description: "Completed the first workout",
        dateEarned: new Date("2024-01-01"),
      }
    ],
  });

  // Create a new class
  const gymClass = new Class({
    title: "Yoga for Beginners",
    description: "A relaxing yoga class for beginners",
    schedule: {
      day: "Monday",
      time: "18:00"
    },
    trainer: "Jane Smith"
  });

  // Create a new workout
  const workout = new Workout({
    title: "Full Body Workout",
    exercises: [
      { name: "Push-up", repetitions: 10 },
      { name: "Squat", repetitions: 15 },
    ],
    duration: 30, // duration in minutes
    level: "Beginner"
  });

  // Create a new competition
  const competition = new Competition({
    title: "January Fitness Challenge",
    description: "Compete with others to stay fit during January",
    startDate: new Date("2024-01-01"),
    endDate: new Date("2024-01-31"),
    participants: ["John Doe", "Jane Smith"]
  });

  // Create a new tracker
  const tracker = new Tracker({
    userId: user._id,
    goals: "Lose weight",
    calories: 2000
  });

  // Create a new blog post
  const blog = new Blog({
    title: "The Benefits of Yoga",
    content: "Yoga has numerous benefits including flexibility, strength, and mental clarity.",
    author: "Jane Smith"
  });

  // Create a new product
  const product = new Product({
    name: "Protein Powder",
    description: "High-quality whey protein powder",
    price: 29.99,
    stock: 50
  });

  // Create a new forum post
  const forumPost = new Forum({
    title: "Favorite Workout Music",
    content: "What music do you listen to while working out?",
    author: "John Doe",
    comments: [
      {
        author: "Jane Smith",
        content: "I love listening to upbeat pop music!",
        date: new Date()
      }
    ],
    date: new Date()
  });

  try {
    await user.save();
    await gymClass.save();
    await workout.save();
    await competition.save();
    await tracker.save();
    await blog.save();
    await product.save();
    await forumPost.save();
    console.log('Data inserted successfully');
    process.exit();
  } catch (error) {
    console.error('Error inserting data:', error);
    process.exit(1);
  }
};

insertData();
