import mongoose from 'mongoose';
var Schema = mongoose.Schema;
// Define the signup schema
const signupSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  lastname:{
    type: String,
    required: true,
  },
  userName:{
    type: String,
    unique: true,
  },
  userImage:{
    type: Buffer||String,
  },
  profession:{
    type: String,
  },
  phone: {
    type: Number,
    required: true,
    unique: true,
  },
  email:{
    type: String,
    required: true,
    unique: true,
  },
  password:{
    type: String,
    required: true,
  },
  date:{
    type: String,
    required: true,
  },
});

// Create the signup model
const Signup =mongoose.models.Userschema || mongoose.model('Userschema', signupSchema);

 export default Signup;
