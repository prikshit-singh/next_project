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
  roles:[],
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
});

// Create the signup model
const Signup =mongoose.models.Signup || mongoose.model('Signup', signupSchema);

 export default Signup;
