import mongoose from 'mongoose';

var Schema = mongoose.Schema;
// Define the signup schema
const RolesSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    canaccess:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Settings_collection' }],
    canaccessmenus:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Menu_collection' }],
    canaccessprofilemenus:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Profile_menu_collection' }],
    createdby: { type: mongoose.Schema.Types.ObjectId, ref: 'User_collection' },

},{
    strict: false, // Set strict to false to allow changes to the schema
    strictPopulate:false,
    collection: 'roles_collection', // Specify the collection name (optional)
  });

// Create the signup model
const Roles = mongoose.models.Roles_collection || mongoose.model('Roles_collection', RolesSchema);

export default Roles;
