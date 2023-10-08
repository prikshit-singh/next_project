import mongoose from 'mongoose';

import Userschema1 from './signup'
var Schema = mongoose.Schema;
// Define the signup schema
const previousYearPaperSchema = new Schema({
    university: {
        type: String,
        required: true,
    },
    college: {
        type: String,
    },
    content: {
        type: String,
        required: true,
    },
    state: {
        type: String,
    },
    city: {
        type: String,
    },
    
    course: {
        type: String,
    },
    subject: {
        type: String,
    },
    year: {
        type: String,

    },
    semester: {
        type: String,
    },
    uploadby: { type: mongoose.Schema.Types.ObjectId, ref: 'User_collection' },
    isvarified: {
        type: String,
    },
    
   

},{
    strict: false, // Set strict to false to allow changes to the schema
    collection: 'papers_collection', // Specify the collection name (optional)
  });

// Create the signup model
const Papers = mongoose.models['Papers_collection'] || mongoose.model('Papers_collection', previousYearPaperSchema);

export default Papers;
