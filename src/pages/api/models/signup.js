import mongoose from 'mongoose';

var Schema = mongoose.Schema;
// Define the signup schema
const signupSchema = new Schema({
  name: {
    type: String,
  },
  lastname:{
    type: String,
  },
  userName:{
    type: String,
    unique: true,
  },
  userImage:{
    type: String,
  },
  profession:{
    type: String,
  },
  phone: {
    type: Number,
    unique: true,
  },
  email:{
    type: String,
    required: true,
  },
  password:{
    type: String,
  },
  roles:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Roles_collection' }],
  isvarify:{
    type:'String'
  },
  isvarifiedWriter:{
    type:'String'
  },
  bio:{
    type:'String'
  },
  usermeta:[],
  date:{
    type: String,
  },
},{
  strict: false, // Set strict to false to allow changes to the schema
  collection: 'user_collection', // Specify the collection name (optional)
});

// Create the signup model
const Signup =  mongoose.models.User_collection || mongoose.model('User_collection', signupSchema);

 export default Signup;
