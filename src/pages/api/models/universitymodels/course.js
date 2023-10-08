import mongoose from 'mongoose';

var Schema = mongoose.Schema;
// Define the signup schema
const CourseSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    coursecode: {
        type: String,
        required: true,
    },
    subject: [
        {
            type: mongoose.Schema.Types.ObjectId, ref: 'Subject_collection'
        }
    ],
    duration: {
        type: String,
        required: true,
    },
    createdby: { type: mongoose.Schema.Types.ObjectId, ref: 'User_collection' },

},{
    strict: false, // Set strict to false to allow changes to the schema
    collection: 'course_collection', // Specify the collection name (optional)
  });

// Create the signup model
const Course = mongoose.models['Course_collection'] || mongoose.model('Course_collection', CourseSchema);

export default Course;
