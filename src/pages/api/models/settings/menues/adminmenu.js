import mongoose from 'mongoose';

var Schema = mongoose.Schema;

// Define the signup schema
const Admin_menuSchema = new Schema({
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
    collection: 'Admin_menu_collection', // Specify the collection name (optional)
  });

// Create the signup model
const Admin_menu = mongoose.models['Admin_menu_collection'] || mongoose.model('Admin_menu_collection', Admin_menuSchema);

export default Admin_menu;
