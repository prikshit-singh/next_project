import mongoose from 'mongoose';
var Schema = mongoose.Schema;
// Define the signup schema
const MenuSchema = new Schema({
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
    collection: 'menu_collection', // Specify the collection name (optional)
  });

// Create the signup model
const Menu = mongoose.models['Menu_collection'] || mongoose.model('Menu_collection', MenuSchema);

export default Menu;
