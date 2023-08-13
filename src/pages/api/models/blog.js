import mongoose from 'mongoose';
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
  writtenby: { type: Schema.Types.ObjectId, ref: 'userschema1' },
  LikedBy: [
    { 
      type: Schema.Types.ObjectId, ref: 'userschema1' 
    }
  ],
  // Comments: [
  //   {
  //   commentText:{type: String},
  //   commentedBy:{type: Schema.Types.ObjectId, ref: 'userschema1'},
  //   commentDate: {
  //     type: String,
  //     required: true,
  //   },
  // }
// ]

});

// Create the signup model
const Blog = mongoose.models['Blogschema5'] || mongoose.model('Blogschema5', blogSchema);

export default Blog;
