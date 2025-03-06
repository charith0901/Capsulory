import mongoose from 'mongoose';
mongoose.set('strictQuery', true);

const connectDB = async () => {
  if (mongoose.connections[0].readyState) {
    return; // Use existing connection
  }
  await mongoose.connect(process.env.MONGODB_URI, {
    serverSelectionTimeoutMS: 5000
  });
};

export default connectDB;
