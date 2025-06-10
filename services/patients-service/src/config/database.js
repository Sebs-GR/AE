// symptom-tracker-monorepo/services/patients-service/src/config/database.js
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
      useNewUrlParser: true, // Though deprecated, some older Mongoose versions may require it. Mongoose 6+ does not need them.
      useUnifiedTopology: true, // Idem.
      // Mongoose 6+ no longer supports these options and ignores them.
      // serverSelectionTimeoutMS: 5000 // Optional: server selection timeout
    });

    console.log('MongoDB connected for patient service...');
  } catch (err) {
    console.error('MongoDB connection error (Patients):', err.message);
    // Exit process with failure
    process.exit(1);
  }
};

export default connectDB;