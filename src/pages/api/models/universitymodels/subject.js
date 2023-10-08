import mongoose from 'mongoose';

var Schema = mongoose.Schema;
// Define the signup schema
const SubjectSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    createdby: { type: mongoose.Schema.Types.ObjectId, ref: 'User_collection' },

},{
    strict: false, // Set strict to false to allow changes to the schema
    collection: 'subject_collection', // Specify the collection name (optional)
  });

// Create the signup model
const Subject = mongoose.models['Subject_collection'] || mongoose.model('Subject_collection', SubjectSchema);

export default Subject;
