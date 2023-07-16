import mongoose from 'mongoose';
var Schema = mongoose.Schema;
// Define the signup schema
const blogSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  subtitle:{
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  keywords:{
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  image:{
    type:Buffer,
    required: true,
  },
  date:{
    type: String,
    required: true,
  },
});

// Create the signup model
const Blog =mongoose.models['Blogschema2'] || mongoose.model('Blogschema2', blogSchema);

 export default Blog;
