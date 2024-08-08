import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB Connected');

    const testCollection = mongoose.connection.collection('testCollection');
    const testDoc = await testCollection.insertOne({ name: 'test' });
    console.log('Inserted Test Document:', testDoc);

    const foundDoc = await testCollection.findOne({ name: 'test' });
    console.log('Found Test Document:', foundDoc);

    await testCollection.deleteOne({ name: 'test' });
    console.log('Deleted Test Document');

    mongoose.connection.close();
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
  }
};

connectDB();
