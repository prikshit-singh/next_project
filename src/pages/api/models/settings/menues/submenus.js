import mongoose from 'mongoose';

var Schema = mongoose.Schema;

// Define the signup schema
const Submenu_menuSchema = new Schema({
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
    collection: 'Submenu_collection', // Specify the collection name (optional)
  });

// Create the signup model
const Submenus = mongoose.models['Submenu_collection'] || mongoose.model('Submenu_collection', Submenu_menuSchema);

export default Submenus;
