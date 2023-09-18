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
    uploadby: { type: mongoose.Schema.Types.ObjectId, ref: 'Signup' },
    isvarified: {
        type: String,
    },
    
   

});

// Create the signup model
const Papers = mongoose.models['Papers1'] || mongoose.model('Papers1', previousYearPaperSchema);

export default Papers;
