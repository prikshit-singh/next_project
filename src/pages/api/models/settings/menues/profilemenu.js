import mongoose from 'mongoose';

var Schema = mongoose.Schema;

// Define the signup schema
const Profile_menuSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    url: {
        type: String,
    },
    createdby: { type: mongoose.Schema.Types.ObjectId, ref: 'User_collection' },

},{
    strict: false, // Set strict to false to allow changes to the schema
    collection: 'profile_menu_collection', // Specify the collection name (optional)
  });

// Create the signup model
const Profile_menu = mongoose.models['Profile_menu_collection'] || mongoose.model('Profile_menu_collection', Profile_menuSchema);

export default Profile_menu;
