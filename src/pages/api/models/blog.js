import mongoose from 'mongoose';
var Schema = mongoose.Schema;
// Define the signup schema
const blogSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    // unique: true,
  },
  content: {
    type: String,
    required: true,
  },
});

// Create the signup model
const Blog =mongoose.models.Blog || mongoose.model('Blog', blogSchema);

 export default Blog;
