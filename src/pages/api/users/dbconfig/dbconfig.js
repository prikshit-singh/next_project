import mongoose from 'mongoose';

export async function connectDB() {
  try {
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    }
    const db = mongoose.connection;
   

    db.on('error', (error) => {
      console.error('MongoDB connection error:', error);
    });

    if (db.readyState === 1) {
      console.log('Connected to MongoDB');
    } else {
      db.once('open', () => {
        console.log('Connected to MongoDB');
      });
    }

    console.log('Connection process completed.');

  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw new Error('Failed to connect to MongoDB');
  }
}
