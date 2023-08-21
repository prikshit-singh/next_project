import mongoose from 'mongoose';
import Userschema1 from './signup'
var Schema = mongoose.Schema;
// Define the signup schema
const blogSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  keywords: {
    type: String,
    required: true,
  },
  
  content: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  date: {
    type: String,
    required: true,
  },
  writtenby: { type: mongoose.Schema.Types.ObjectId, ref: 'Signup' },
  LikedBy: [
    {
      type: Schema.Types.ObjectId, ref: 'Signup'
    }
  ],
  isvarified:{
    type:String,
  },
  description:{
    type: String,
  },
  Comments: [
    {
      commentText: { type: String, required: true, },
      commentedBy: { type: Schema.Types.ObjectId, ref: 'Signup' },
      commentDate: {
        type: String,
        required: true,
      },
      commentreplies: [{
        commentText: { type: String},
        commentedBy: { type: Schema.Types.ObjectId, ref: 'Signup' },
        commentDate: {
          type: String,
        },
      }]
    }
  ]

});

// Create the signup model
const Blog = mongoose.models['Blog'] || mongoose.model('Blog', blogSchema);

export default Blog;
