// symptom-tracker-monorepo/services/symptoms-service/src/config/database.js
import mongoose from 'mongoose';
import 'dotenv/config';

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI;
    if (!mongoURI) {
      console.error('MONGO_URI is not defined in environment variables.');
      process.exit(1);
    }

    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('MongoDB connected for symptom service...');
  } catch (err) {
    console.error('MongoDB connection error (Symptoms):', err.message);
    process.exit(1);
  }
};

export default connectDB;