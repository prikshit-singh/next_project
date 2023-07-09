import mongoose from 'mongoose'
 export async function connectDB(){
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.log('Error connecting to MongoDB:', error);
    throw new Error('Failed to connect to MongoDB');
  }
 }

// const connectDB = async () => {
//     try {
//       await mongoose.connect(process.env.MONGODB_URI, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//       });
//       console.log('Connected to MongoDB');
//     } catch (error) {
//       console.error('Error connecting to MongoDB:', error);
//     }
//   };
  
//   export default connectDB;