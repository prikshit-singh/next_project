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
    type:String,
  },
  date:{
    type: String,
    required: true,
  },
  writtenby: { type: Schema.Types.ObjectId, ref: 'userschema1' },
});

// Create the signup model
const Blog =mongoose.models['Blogschema4'] || mongoose.model('Blogschema4', blogSchema);

 export default Blog;
