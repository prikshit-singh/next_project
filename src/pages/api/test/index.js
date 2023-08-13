const mongoose = require('mongoose');
import { connectDB } from '../users/dbconfig/dbconfig';

// Define the User schema
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
});

// Create the User model
const User =mongoose.models['Usertest'] || mongoose.model('Usertest', userSchema);

// Define the Post schema
const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'Usertest' }, // Reference to User model
});

// Create the Post model
const Post =mongoose.models['Posttest'] || mongoose.model('Posttest', postSchema);

// Connect to MongoDB and then execute the example

// Example usage: Create a new post and populate the author field
export default async function handler(req, res){
    connectDB()

  // Create a new user
  const user = await User.create({ username: 'exampleUser', email: 'user@example.com' });

  // Create a new post associated with the user
  const post = await Post.create({ title: 'New Post', content: 'This is a post content', author: user._id });

  // Populate the author field
  const populatedPost = await Post.findById(post._id).populate('author');
res.send(populatedPost)
  console.log('Populated Post:', populatedPost);
};
