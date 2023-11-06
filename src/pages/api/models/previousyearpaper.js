import mongoose from 'mongoose';

import Userschema1 from './signup'
var Schema = mongoose.Schema;
// Define the signup schema
const previousYearPaperSchema = new Schema({
    university: { type: mongoose.Schema.Types.ObjectId, ref: 'University_collection' },
    college: { type: String },
    content: { type: String, required: true, },
    course:  { type: mongoose.Schema.Types.ObjectId, ref: 'Course_collection' },
    year: {type: String, },
    semester: { type: String },
    subject: {  type: mongoose.Schema.Types.ObjectId, ref: 'Subject_collection' },
    uploadby: { type: mongoose.Schema.Types.ObjectId, ref: 'User_collection' },
    isvarified: { type: String },

},{
    strict: false, // Set strict to false to allow changes to the schema
    collection: 'question_papers_collection', // Specify the collection name (optional)
  });

// Create the signup model
const Papers = mongoose.models['Question_papers_collection'] || mongoose.model('Question_papers_collection', previousYearPaperSchema);

export default Papers;
