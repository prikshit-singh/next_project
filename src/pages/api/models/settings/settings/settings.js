import mongoose from 'mongoose';

var Schema = mongoose.Schema;
// Define the signup schema
const SettingsSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    parentmenu:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Menu_collection' }],
    createdby: { type: mongoose.Schema.Types.ObjectId, ref: 'User_collection' },

},{
    strict: false, // Set strict to false to allow changes to the schema
    collection: 'settings_collection', // Specify the collection name (optional)
  });

// Create the signup model
const Settings = mongoose.models['Settings_collection'] || mongoose.model('Settings_collection', SettingsSchema);

export default Settings;
