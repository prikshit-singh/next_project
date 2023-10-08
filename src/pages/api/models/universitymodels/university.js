import mongoose from 'mongoose';

var Schema = mongoose.Schema;
// Define the signup schema
const UniversitySchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    universitycode: {
        type: String,
        required: true,
    },
    state: { type: mongoose.Schema.Types.ObjectId, ref: 'State_collection' },
    city: { type: mongoose.Schema.Types.ObjectId, ref: 'Cities_collection' },
    course: [
        {
            type: mongoose.Schema.Types.ObjectId, ref: 'Course_collection'
        }
    ],
    createdby: { type: mongoose.Schema.Types.ObjectId, ref: 'User_collection' },

},{
    strict: false, // Set strict to false to allow changes to the schema
    collection: 'university_collection', // Specify the collection name (optional)
  });

// Create the signup model
const University = mongoose.models.University_collection || mongoose.model('University_collection', UniversitySchema);

export default University;
