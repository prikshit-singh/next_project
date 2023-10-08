import mongoose from 'mongoose';

var Schema = mongoose.Schema;
// Define the signup schema
const CitySchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    state: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'State_collection',
    },
    createdby: { type: mongoose.Schema.Types.ObjectId, ref: 'User_collection' },

},{
    strict: false, // Set strict to false to allow changes to the schema
    collection: 'cities_collection', // Specify the collection name (optional)
  });

// Create the signup model
const City = mongoose.models['Cities_collection'] || mongoose.model('Cities_collection', CitySchema);

export default City;
