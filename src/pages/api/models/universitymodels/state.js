import mongoose from 'mongoose';

var Schema = mongoose.Schema;
// Define the signup schema
const StateSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    statecode: {
        type: String,
        required: true,
    },
    createdby: { type: mongoose.Schema.Types.ObjectId, ref: 'User_collection' },

},{
    strict: false, // Set strict to false to allow changes to the schema
    collection: 'state_collection', // Specify the collection name (optional)
  });

// Create the signup model
const State = mongoose.models['State_collection'] || mongoose.model('State_collection', StateSchema);

export default State;
